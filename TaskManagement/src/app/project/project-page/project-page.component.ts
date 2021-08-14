import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Account } from 'src/app/model/account';
import { Project } from 'src/app/model/project';
import { MemberRequest } from 'src/app/model/request/member-request';
import { ProjectService } from 'src/app/service/project-service';
import { UserToProjectService } from 'src/app/service/user-to-project-service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  @ViewChild('addMemberForm') addMemberForm;
  
  dtTrigger: Subject<any> = new Subject<any>();
  
  accounts: Account[];
  showMessage: any;
  projectObj: Project = new Project();
  addMemberModalState: boolean;
  memberObj = new Account();
  errorMsgStyle: any = {
    color: "red",
    fontStyle: "italic",
    fontSize: "10"
  };
  imageSrc: any;
  
  constructor(private projectService: ProjectService, private uToPService: UserToProjectService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let projId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.projectObj.projectId = projId;
    this.memberObj = new Account();

    this.projectService.getProjectById(projId)
    .subscribe(res => {      
      this.projectObj.projectName = res.projectName;
      this.projectObj.projectDescription = res.projectDescription;
      this.projectObj.startDate = res.startDate;
      this.projectObj.endDate = res.endDate;
      this.projectObj.ownerAccount = res.ownerAccount;
      this.projectObj.ownerAccount.profilePic = res.ownerAccount.profilePic;

      if (this.projectObj.ownerAccount.profilePic == undefined){
        this.imageSrc = 'assets/image/defaultProfile.jpg';
      }else{
        var url = 'data:image/jpeg;base64,' + res.ownerAccount.profilePic;
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(url);  
      }
      
      this.uToPService.getAccountByProjectId(projId)
      .subscribe(res => {
        this.accounts = res;
        this.dtTrigger.next();
      }, err => {
        this.showMessage = "Unable to get accounts";
      });
    }, err => {
      this.showMessage = "Unable to get project info";
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  openModal(): void{
    this.addMemberModalState = true;
  }

  closeModal(): void{
    this.addMemberModalState = false;
    this.addMemberForm.reset();
  }

  addMember(){
    this.uToPService.addMember(new MemberRequest(this.projectObj.projectId, this.memberObj.email))
    .subscribe(res => {
      let memberAccount = new Account();
      memberAccount.id = res.id;
      memberAccount.email = res.email;
      memberAccount.name = res.name;
      memberAccount.roleId = res.roleId;
      memberAccount.roleName = res.roleName;
    
      this.accounts.push(memberAccount);
      this.closeModal();
    }, err => {
      console.log(err.error);
    });
  }

  removeMember(accountId){
    this.projectObj.projectId = parseInt(this.route.snapshot.paramMap.get('id'));
    let projectId = Number(this.projectObj.projectId);
    
    this.uToPService.removeProjectMember(projectId, accountId)
    .subscribe(res => {
      let index = -1;

      for(let i = 0; i < this.accounts.length; i++){
        if(this.accounts[i].id == accountId){
          index = i;
          break;
        }
      }

      this.accounts.splice(index);
    }, err => {
      console.log(err.error);
    });
  }
}

import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  
  constructor(private projectService: ProjectService, private uToPService: UserToProjectService, private route: ActivatedRoute) { }

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
      
      this.uToPService.getAccountByProjectId(projId)
      .subscribe(res => {
        this.accounts = res;
      }, err => {
        this.showMessage = "Unable to get accounts";
      });
    }, err => {
      this.showMessage = "Unable to get project info";
    });
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
      console.log("error");
      this.showMessage = err.error;
    });
  }
}

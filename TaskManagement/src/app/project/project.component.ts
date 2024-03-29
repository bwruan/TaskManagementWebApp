import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Account } from '../model/account';
import { Project } from '../model/project';
import { ProjectRequest } from '../model/request/project-request';
import { ProjectService } from '../service/project-service';
import { UserService } from '../service/user-service';
import { UserToProjectService } from '../service/user-to-project-service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy  {
  @ViewChild('addProjectForm') addProjectForm;

  dtTrigger: Subject<any> = new Subject<any>();

  projects: Project[];
  showMessage: any;
  projectId: number;
  addProjModalState: boolean;
  projObj: Project = new Project();
  errorMsgStyle: any = {
    color: "red",
    fontStyle: "italic",
    fontSize: "10"
  };

  constructor(private projectService: ProjectService, private uToPService: UserToProjectService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.projObj.ownerAccount = new Account();

    this.uToPService.getProjectsByAccountId()
    .subscribe(res => {
      this.projects = res;
      this.dtTrigger.next();

      this.userService.getAccountById()
      .subscribe(res => {
        this.projObj.accountId = res.id;
        this.projObj.ownerAccount.name = res.name;
      }, err => {
        this.showMessage = err.error; 
      });
    }, err => {
      console.log("error");
      this.showMessage = "Unable to grab projects.";
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onSelect(projectId): void {
    this.router.navigate(['/projects', projectId]);
  }

  openModal(): void{
    this.addProjModalState = true;
  }

  closeModal(): void{
    this.addProjModalState = false;
    this.addProjectForm.reset();
  }

  createProject(){
    this.projObj.accountId = Number(localStorage.getItem("accountId"));

    this.projectService.createProject(new ProjectRequest(this.projObj.projectName, this.projObj.projectDescription, this.projObj.accountId, this.projObj.startDate, this.projObj.endDate))
    .subscribe(res => {
      this.showMessage = undefined;
      
      let newProj = new Project();
      newProj.projectId = res.projectId
      newProj.projectName = this.projObj.projectName;
      newProj.projectDescription = this.projObj.projectDescription;
      newProj.startDate = this.projObj.startDate;
      newProj.endDate = this.projObj.endDate;
      newProj.accountId = this.projObj.accountId;
      newProj.ownerAccount = new Account();
      newProj.ownerAccount.name = this.projObj.ownerAccount.name;

      this.projects.push(newProj);

      this.closeModal();
    }, err => {
      console.log(err);
      this.showMessage = err.error;
    });
  }

  deleteProject(projectId){
    this.projectService.deleteProject(projectId)
    .subscribe(res => {
      let index = -1;
      for(let i = 0; i < this.projects.length; i++){
        if(this.projects[i].projectId == projectId){
          index = i;
          break;
        }
      }
      this.projects.splice(index);
    }, err => {
      console.log(err);
          this.showMessage = err.error;
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../model/project';
import { ProjectRequest } from '../model/request/project-request';
import { ProjectService } from '../service/project-service';
import { UserToProjectService } from '../service/user-to-project-service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @ViewChild('addProjectForm') addProjectForm;

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

  constructor(private projectService: ProjectService, private uToPService: UserToProjectService, private router: Router) { }

  ngOnInit(): void {
    this.uToPService.getProjectsByAccountId()
    .subscribe(res => {
      this.projects = res;
    }, err => {
      console.log("error");
      this.showMessage = "Unable to grab projects.";
    });
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
      console.log(res);
      this.showMessage = undefined;
      this.projects.push(this.projObj);

      for(let i = 0; i < this.projects.length; i++){
        if(this.projects[i].projectId == this.projObj.projectId){
          this.projects[i].projectName = this.projObj.projectName;
          this.projects[i].projectDescription = this.projObj.projectDescription;
          this.projects[i].startDate = this.projObj.startDate;
          this.projects[i].endDate = this.projObj.endDate;
          this.projects[i].ownerAccount = this.projObj.ownerAccount;
        }
      }

      this.closeModal();
    }, err => {
      console.log(err);
      this.showMessage = err.error;
    });
  }
}

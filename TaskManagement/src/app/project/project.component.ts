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
    this.projectService.createProject(new ProjectRequest(this.projObj.projectId, this.projObj.projectName, this.projObj.projectDescription, this.projObj.ownerAccount.id))
    .subscribe(res => {

    }, err => {

    });
  }
}

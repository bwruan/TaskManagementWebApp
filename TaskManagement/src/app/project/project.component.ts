import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { ProjectService } from '../service/project-service';
import { UserToProjectService } from '../service/user-to-project-service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  // projects: Project[];
  showMessage: any;
  projectObj: Project = new Project();

  constructor(private projectService: ProjectService, private uToPService: UserToProjectService) { }

  ngOnInit(): void {
    // this.uToPService.getProjectsByAccountId()
    // .subscribe(res => {
    //   console.log("Grabbing projects");
    //   this.projects = res;
    // }, err => {
    //   console.log("ERROR");
    //   this.showMessage = "Unable to grab projects.";
    // });

    this.projectService.getProjectById(3)
    .subscribe(res => {
      console.log("getting project1");
      this.projectObj.accountId = Number(localStorage.getItem("accountId"));
      this.projectObj.projectName = res.projectName;
      this.projectObj.projectDescription = res.projectDescription;
      this.projectObj.projectId = res.projectId;
    }, err => {
      console.log("error");
      this.showMessage = "Unable to get project1";
    });
  }

}

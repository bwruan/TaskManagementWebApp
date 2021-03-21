import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../model/project';
import { ProjectService } from '../service/project-service';
import { UserToProjectService } from '../service/user-to-project-service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[];
  showMessage: any;
  projectId: number;

  constructor(private projectService: ProjectService, private uToPService: UserToProjectService, private router: Router) { }

  ngOnInit(): void {
    this.uToPService.getProjectsByAccountId()
    .subscribe(res => {
      console.log("Grabbing proj");
      this.projects = res;
    }, err => {
      console.log("error");
      this.showMessage = "Unable to grab projects.";
    });
  }

  onSelect(projectId): void {
    console.log(projectId);
    this.router.navigate(['/projects', projectId]);
  }
}

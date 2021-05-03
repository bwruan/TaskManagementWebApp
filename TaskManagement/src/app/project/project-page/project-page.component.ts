import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/model/account';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project-service';
import { UserToProjectService } from 'src/app/service/user-to-project-service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  
  accounts: Account[];
  showMessage: any;
  projectObj: Project = new Project();
  
  constructor(private projectService: ProjectService, private uToPService: UserToProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let projId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.projectObj.projectId = projId;

    this.projectService.getProjectById(projId)
    .subscribe(res => {
      console.log("project success");
      
      this.projectObj.projectName = res.projectName;
      this.projectObj.projectDescription = res.projectDescription;
      this.projectObj.startDate = res.startDate;
      this.projectObj.endDate = res.endDate;
      
      this.uToPService.getAccountByProjectId(projId)
      .subscribe(res => {
        console.log("Getting accounts");
        this.accounts = res;
      }, err => {
        console.log("account errors");
        this.showMessage = "Unable to get accounts";
      });
    }, err => {

    });
  }
}

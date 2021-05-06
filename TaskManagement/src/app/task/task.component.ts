import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../model/task';
import { TaskService } from '../service/task-service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  showMessage: any;
  taskModalState: boolean;
  tasks: Task[];
  taskObj: Task = new Task();
  
  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let projectId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.taskObj.projectId = projectId;

    this.taskService.getTasksByProjectId(projectId)
    .subscribe(res => {
      this.tasks = res;
    }, err => {
      this.showMessage = "Unable to grab tasks.";
    });
  }

  openModal(): void{
    this.taskModalState = true;

    let taskId = this.taskObj.taskId;

    this.taskService.getTaskByTaskId(taskId)
    .subscribe(res => {
      console.log("grabbing task info");
      console.log(taskId);
      
      this.taskObj.taskName = res.taskName;
      this.taskObj.taskDescription = res.taskDescription;
    })
  }

  closeModal(): void{
    this.taskModalState = false;
  }
}

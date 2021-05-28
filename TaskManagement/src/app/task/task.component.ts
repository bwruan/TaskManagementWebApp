import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../model/account';
import { CompleteRequest } from '../model/request/complete-request';
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
  successMessage: boolean;
  
  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let projectId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.taskObj.projectId = projectId;
    this.taskObj.taskeeAccount = new Account();

    this.taskService.getTasksByProjectId(projectId)
    .subscribe(res => {
      this.tasks = res;
    }, err => {
      this.showMessage = "Unable to grab tasks.";
    });
  }

  openModal(taskId): void{
    this.taskModalState = true;

    this.taskService.getTaskByTaskId(taskId)
    .subscribe(res => {
      this.taskObj.taskName = res.taskName;
      this.taskObj.taskDescription = res.taskDescription;
      this.taskObj.taskeeAccount = res.taskeeAccount;
      this.taskObj.dueDate = res.dueDate;
      this.taskObj.completedDate = res.completedDate;
      this.taskObj.taskId = res.taskId;
      this.taskObj.isCompleted = res.isCompleted;
    }, err => {
      console.log("unable to grab task info");
    });
  }

  closeModal(): void{
    this.taskModalState = false;
    this.showMessage = undefined;
  }

  markComplete(){
    this.taskService.markComplete(new CompleteRequest(this.taskObj.taskId))
    .subscribe(res => {
      this.taskObj.isCompleted = true;
      this.taskObj.completedDate = res.completedDate;
      this.successMessage = true;
      this.showMessage = "Task completed";

      for(let i = 0; i < this.tasks.length; i++){
        if(this.tasks[i].taskId == this.taskObj.taskId){
          this.tasks[i].isCompleted = this.taskObj.isCompleted;
        }
      }
    }, err => {
      console.log("Task Complete Error");
      this.successMessage = false;
      this.showMessage = err.error;
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../model/account';
import { BaseTaskRequest } from '../model/request/base-task-request';
import { TaskRequest } from '../model/request/task-request';
import { Task } from '../model/task';
import { TaskService } from '../service/task-service';
import { UserToProjectService } from '../service/user-to-project-service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @ViewChild('addTaskForm') addTaskForm;
  
  showMessage: any;
  taskModalState: boolean;
  tasks: Task[];
  taskObj: Task = new Task();
  successMessage: boolean;
  addTaskModalState: boolean;
  errorMsgStyle: any = {
    color: "red",
    fontStyle: "italic",
    fontSize: "10"
  };
  accounts: Account[];
  
  constructor(private taskService: TaskService, private route: ActivatedRoute, private uToPService: UserToProjectService) { }

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
    this.taskService.markComplete(new BaseTaskRequest(this.taskObj.taskId))
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

  openAddModal(): void{
    this.addTaskModalState = true;
    let projectId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.taskObj.projectId = projectId;
    this.uToPService.getAccountByProjectId(projectId)
        .subscribe(res => {
          this.accounts = res;

          let defaultAccount = new Account();
          defaultAccount.id = 0;
          defaultAccount.name = "Choose Member";
          this.accounts.unshift(defaultAccount);

          this.taskObj.taskeeAccount.id = 0;
        }, err => {
          this.showMessage = "Unable to get accounts";
        });
  }

  closeAddModal(): void{
    this.addTaskModalState = false;
    this.addTaskForm.reset();

  }

  addTask(){
    this.taskObj.taskeeId = Number(this.taskObj.taskeeAccount.id);

    this.taskService.createTask(new TaskRequest(this.taskObj.taskId, this.taskObj.taskName, this.taskObj.taskDescription, this.taskObj.projectId, 
      this.taskObj.taskeeId, this.taskObj.dueDate))
        .subscribe(res => {
          this.showMessage = undefined;

          let newTask = new Task();
          newTask.taskId = res.taskId;
          newTask.taskName = this.taskObj.taskName;
          newTask.taskDescription = this.taskObj.taskDescription;
          newTask.projectId = this.taskObj.projectId;
          newTask.dueDate = this.taskObj.dueDate;   
          newTask.taskeeId = this.taskObj.taskeeId;
          newTask.taskeeAccount = new Account();
          newTask.taskeeAccount.id = this.taskObj.taskeeId;
          newTask.taskeeAccount.name = res.taskeeAccount.name;

          console.log(newTask.taskeeAccount);

          this.tasks.push(newTask);      

          this.closeAddModal();
        }, err => {
          console.log(err);
          this.showMessage = err.error;
        });
  }

  deleteTask(){
    this.taskService.deleteTask(new BaseTaskRequest(this.taskObj.taskId))
    .subscribe(res => {
      let index = -1;
      for(let i = 0; i < this.tasks.length; i++){
        if(this.tasks[i].taskId == this.taskObj.taskId){
          index = i;
          break;
        }
      }

      this.tasks.splice(index);
    }, err => {
      console.log(err);
          this.showMessage = err.error;
    });
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  showMessage: any;
  taskModalState: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

  openModal(): void{
    this.taskModalState = true;
    // get task info
  }

  closeModal(): void{
    this.taskModalState = false;
  }
}

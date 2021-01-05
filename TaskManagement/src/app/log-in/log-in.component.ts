import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  @Input('openModalInput') openModalInput: boolean;
  @Output('closeModalEvent') closeModalEvent = new EventEmitter();
  @Output('openSignUpModalEvent') openSignUpModalEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(): void{
    this.closeModalEvent.emit(false);
  }

  openSignUpModal(): void{
    console.log("closing log in modal, opening sign up modal")
    this.closeModal();
    this.openSignUpModalEvent.emit(true);
  }

}

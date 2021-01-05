import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Input('openSignUpModalInput') openSignUpModalInput: boolean;
  @Output('closeSignUpModalEvent') closeModalEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeSignUpModal(): void{
    console.log("closing sign up modal");
    this.closeModalEvent.emit(false);
  }
}

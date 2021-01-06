import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  modalState: boolean;
  signUpModalState: boolean;
  
  title = 'TaskManagement';

  openModal(){
    console.log("inside parent open modal event");
    this.modalState = true;
  }

  closeModal(){
    console.log("changing back to false");
    this.modalState = false;
  }

  openSignUpModal(){
    console.log("inside parent open sign up")
    this.signUpModalState = true;
  }

  closeSignUpModal(){
    console.log("inside parent close sign up");
    this.signUpModalState = false;
  }
}

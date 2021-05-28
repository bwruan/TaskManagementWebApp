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
    this.modalState = true;
  }

  closeModal(){
    this.modalState = false;
  }

  openSignUpModal(){
    this.signUpModalState = true;
  }

  closeSignUpModal(){
    this.signUpModalState = false;
  }
}

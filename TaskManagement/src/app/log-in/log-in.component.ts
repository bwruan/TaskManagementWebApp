import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LogIn } from '../model/log-in';
import { LoginRequest } from '../model/request/login-request';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  @Input('openModalInput') openModalInput: boolean;
  @Output('closeModalEvent') closeModalEvent = new EventEmitter();
  @Output('openSignUpModalEvent') openSignUpModalEvent = new EventEmitter();
  @ViewChild('loginForm') loginForm; //feth reference of form using ViewChild property

  loginObj: LogIn = new LogIn();
  showMessage: any;
  errorMsgStyle: any = {
    color: "red",
    fontStyle: "italic",
    fontSize: "10"
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.openModalInput){
      this.loginForm.reset();
    }
  }

  closeModal(): void{
    this.closeModalEvent.emit(false);
    this.showMessage = undefined;
  }

  openSignUpModal(): void{
    this.closeModal();
    this.openSignUpModalEvent.emit(true);
  }

  loginSubmit(){
    console.log(this.loginObj);
    this.userService.logIn(new LoginRequest(this.loginObj.email, this.loginObj.password))
    .subscribe(res => {
      this.showMessage = undefined;

      localStorage.setItem("token", res.token);
      localStorage.setItem("email", this.loginObj.email);
      localStorage.setItem("accountId", res.accountId);

      this.closeModal();
    }, err => {
      console.log(err);
      this.showMessage = "Unable to log in: " + err.error;      
    });
  }
}

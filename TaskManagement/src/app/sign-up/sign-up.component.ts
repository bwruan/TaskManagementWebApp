import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from '../model/account';
import { AccountRequest } from '../model/request/account-request';
import { Roles } from '../model/roles';
import { RoleService } from '../service/role-service';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Input('openSignUpModalInput') openSignUpModalInput: boolean;
  @Output('closeSignUpModalEvent') closeModalEvent = new EventEmitter();

  createAccountObj: Account = new Account();
  showMessage: any;
  errorMsgStyle: any = {
    color: "red",
    fontStyle: "italic",
    fontSize: "10"
  };
  roles: Roles[];

  constructor(private userService: UserService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.getRoles()
    .subscribe(res => {
      console.log("Happy Path :D");
      this.roles = res;
      let defaultRole = new Roles();
      defaultRole.id = 0;
      defaultRole.name = "Choose Role";
      this.roles.unshift(defaultRole);

      this.createAccountObj.roleId = 0;
    }, err => {
      console.log("Error Path D:");
      this.showMessage = "Unable to grab roles with error: " + err.error;
    });
  }

  closeSignUpModal(): void{
    console.log("closing sign up modal");
    this.closeModalEvent.emit(false);
    this.showMessage = undefined;
  }

  signUpSumbit(){
    console.log(this.createAccountObj);
    if(this.createAccountObj.confirmPassword != this.createAccountObj.password){
      this.showMessage = "Passwords do not match.";
      return;
    }

    if(this.createAccountObj.roleId == 0){
      this.showMessage = "Please choose a Role.";
      return;
    }

    this.userService.createAccount(new AccountRequest(this.createAccountObj.id, this.createAccountObj.firstName + " " + this.createAccountObj.lastName, this.createAccountObj.email, 
      this.createAccountObj.password, this.createAccountObj.roleId, this.createAccountObj.profilePic))
      .subscribe(res => {
        console.log("Happy Path :D");
        console.log(res);
        this.showMessage = undefined;
      }, err => {
        console.log("Error Path D:");
        console.log(err);
        this.showMessage = err.error;        
      });
  }
}

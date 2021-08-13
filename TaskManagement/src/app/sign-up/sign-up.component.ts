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
  isImage: boolean;
  uploadedFile : File = null;

  constructor(private userService: UserService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.getRoles()
    .subscribe(res => {
      this.roles = res;
      // let defaultRole = new Roles();
      // defaultRole.id = 0;
      // defaultRole.name = "Choose Role";
      // this.roles.unshift(defaultRole);

      this.createAccountObj.roleId = this.roles[0].id;
    }, err => {
      this.showMessage = "Unable to grab roles with error: " + err.error;
    });
  }

  closeSignUpModal(): void{
    this.closeModalEvent.emit(false);
    this.showMessage = undefined;
  }

  signUpSumbit(){
    if(this.createAccountObj.confirmPassword != this.createAccountObj.password){
      this.showMessage = "Passwords do not match.";
      return;
    }

    if(this.createAccountObj.roleId == 0){
      this.showMessage = "Please choose a Role.";
      return;
    }

    this.userService.createAccount(new AccountRequest(this.createAccountObj.id, this.createAccountObj.firstName + " " + this.createAccountObj.lastName, this.createAccountObj.email, 
    this.createAccountObj.password, this.createAccountObj.roleId, null))
        .subscribe(res => {
          console.log(res);
          if (this.uploadedFile != null){
            var id = res.id;
            //make call to upload photo
          }else{
            this.showMessage = undefined;
          }
        }, err => {
          console.log(err);
          this.showMessage = err.error;        
        });
  }

  uploadChange(event){
    let pic = event.target.files[0];
    this.uploadedFile = pic;
    let ext = pic.name.split('.').pop();
    
    if(ext.toLowerCase() == "jpeg" || ext.toLowerCase() == "png" || ext.toLowerCase() == "jpg"){
      this.isImage = true;
    }
    else{
      this.isImage = false;
      this.showMessage = "Please upload either jpeg or png file."
      
    }
  }
}

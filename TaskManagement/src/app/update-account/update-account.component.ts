import { Component, OnInit } from '@angular/core';
import { Account } from '../model/account';
import { AccountInfoRequest } from '../model/request/account-info-request';
import { PasswordRequest } from '../model/request/password-request';
import { Roles } from '../model/roles';
import { UpdateAccount } from '../model/update-account';
import { RoleService } from '../service/role-service';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  updateAccountObj: UpdateAccount = new UpdateAccount();
  roles: Roles[];
  showMessage: any;

  constructor(private userService: UserService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.userService.getAccount()
    .subscribe(res => {
      let nameArray = res.name.split(" ");

      this.updateAccountObj.firstName = nameArray[0];
      this.updateAccountObj.lastName = nameArray[1];
      this.updateAccountObj.email = res.email;
      this.updateAccountObj.roleId = res.roleId;
    }, err => {
      this.showMessage = "Unable to get account.";
    });

    this.roleService.getRoles()
    .subscribe(res => {
      console.log("Happy Path :D");
      this.roles = res;
    }, err => {
      console.log("Error Path D:");
      this.showMessage = "Unable to grab roles.";
    });
  }

  updateSubmit(){
    console.log(this.updateAccountObj);    

    this.userService.updateAccount(new AccountInfoRequest(this.updateAccountObj.id, this.updateAccountObj.firstName + this.updateAccountObj.lastName, this.updateAccountObj.email,
      this.updateAccountObj.roleId, null))
      .subscribe(res => {
        console.log("Happy path");
        console.log(res);
        this.showMessage = undefined;
      }, err => {
        console.log("Error path");
        console.log(err);
        this.showMessage = err.error;
      });
  }

}

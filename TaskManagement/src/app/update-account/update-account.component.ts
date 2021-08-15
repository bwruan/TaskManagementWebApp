import { Component, OnInit } from '@angular/core';
import { Account } from '../model/account';
import { AccountInfoRequest } from '../model/request/account-info-request';
import { PasswordRequest } from '../model/request/password-request';
import { Roles } from '../model/roles';
import { UpdateAccount } from '../model/update-account';
import { RoleService } from '../service/role-service';
import { UserService } from '../service/user-service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  updateAccountObj: UpdateAccount = new UpdateAccount();
  roles: Roles[];
  showMessage: any;
  buttonDisabled: boolean;
  successMessage: boolean;
  errorMsgStyle: any = {
    color: "red",
    fontStyle: "italic",
    fontSize: "10"
  };
  isImage: boolean;
  uploadedFile : File = null;
  imageSrc: any;
  showErrorMessage: any;

  constructor(private userService: UserService, private roleService: RoleService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userService.getAccountByEmail()
    .subscribe(res => {
      let nameArray = res.name.split(" ");

      this.updateAccountObj.id = Number(localStorage.getItem("accountId"));
      this.updateAccountObj.firstName = nameArray[0];
      this.updateAccountObj.lastName = nameArray[1];
      this.updateAccountObj.email = res.email;
      this.updateAccountObj.roleId = res.roleId;
      this.updateAccountObj.profilePic = res.profilePic;
      
      if (this.updateAccountObj.profilePic == undefined){
        this.imageSrc = 'assets/image/defaultProfile.jpg';
      }else{
  
        var url = 'data:image/jpeg;base64,' + res.profilePic;
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(url);  
      }
    }, err => {
      this.showMessage = "Unable to get account.";
    });

    this.roleService.getRoles()
    .subscribe(res => {
      this.roles = res;
    }, err => {
      this.showMessage = "Unable to grab roles.";
    });
  }

  updateSubmit(){

    let updateRequest = new AccountInfoRequest(this.updateAccountObj.id, this.updateAccountObj.firstName + " " + this.updateAccountObj.lastName, this.updateAccountObj.email, Number(this.updateAccountObj.roleId), this.updateAccountObj.profilePic);
    if (this.uploadedFile != null){
      var fileReader = new FileReader();
      fileReader.readAsArrayBuffer(this.uploadedFile);

      fileReader.onloadend = (e) => {
        if (e.target.readyState == FileReader.DONE) {
          let arrayBuffer = e.target.result as ArrayBuffer;
          let uintArray = new Uint8Array(arrayBuffer);       
          updateRequest.newPic = (btoa(String.fromCharCode.apply(null, uintArray)))
          this.userService.updateAccount(updateRequest)
            .subscribe(res => {
              this.successMessage = true;
              this.showMessage = "Account updated!";
              location.reload();
            },
            err=>{
              this.successMessage = false;
              this.showMessage = err.error;
            });
       }
      }        
    }else{
      this.userService.updateAccount(updateRequest)
        .subscribe(res => {
          this.successMessage = true;
          this.showMessage = "Account updated!";
          location.reload();    
        }, err => {
          console.log(err);
          this.successMessage = false;
          this.showMessage = err.error;
        });
    }
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
      this.showErrorMessage = "Please upload either jpg, jpeg, or png file.";
    }
  }
}

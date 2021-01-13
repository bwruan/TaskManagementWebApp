import { BaseAccountRequest } from "./base-account-request";

export class AccountInfoRequest{
    id: number;
    newName: string;
    newEmail: string;            
    newRoleId: number;
    newPic: any;
    
    constructor(id: number, newName: string, newEmail: string, newRoleId: number, newPic: any){
        this.id = id;
        this.newName = newName;
        this.newEmail = newEmail;
        this.newRoleId = newRoleId;
        this.newPic = newPic;
    }
}

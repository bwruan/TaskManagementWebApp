import { BaseAccountRequest } from "./base-account-request";

export class PasswordRequest extends BaseAccountRequest{
    newPassword: string;

    constructor(id: number, name: string, email: string, 
        password: string, roleId: number, profilePic: any, newPassword: string){
            super(id, name, email, password, roleId, profilePic);

        this.newPassword = newPassword;
    }
}

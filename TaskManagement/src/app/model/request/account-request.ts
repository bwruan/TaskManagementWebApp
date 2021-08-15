import { BaseAccountRequest } from "./base-account-request";

export class AccountRequest extends BaseAccountRequest{
    constructor(id: number, name: string, email: string, 
        password: string, roleId: number, profilePic: any){
            super(id, name, email, password, roleId, profilePic);
    }
}

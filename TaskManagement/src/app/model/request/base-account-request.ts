export class BaseAccountRequest {
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number;
    profilePic: any;

    constructor(id: number, name: string, email: string, password: string, roleId: number, profilePic: any){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.roleId = roleId;
        this.profilePic = profilePic;
    }
}

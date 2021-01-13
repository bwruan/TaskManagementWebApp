import { BaseAccountRequest } from "./request/base-account-request";

export class Account{
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleId: number;
    profilePic: any;
    status: boolean;
}

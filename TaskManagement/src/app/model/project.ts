import { Account } from "./account";

export class Project {
    projectId: number;
    projectName: string;
    projectDescription: string;
    accountId: number;
    ownerAccount: Account;
    startDate: Date;
    endDate: Date;
}

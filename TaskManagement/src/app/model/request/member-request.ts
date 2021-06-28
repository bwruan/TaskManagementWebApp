export class MemberRequest {
    projectId: number;
    email: string;

    constructor(projectId: number, email: string){
        this.projectId = projectId;
        this.email = email;
    }
}

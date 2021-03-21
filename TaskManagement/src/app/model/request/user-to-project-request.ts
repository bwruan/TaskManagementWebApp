export class UserToProjectRequest {
    projectId: number;
    newName: string;
    newDescription: string;
    newOwnerId: number;

    constructor(projectId:number, newName: string, newDescription: string, newOwnerId: number){
        this.projectId = projectId;
        this.newName = newName;
        this.newDescription = newDescription;
        this.newOwnerId = newOwnerId;
    }
}

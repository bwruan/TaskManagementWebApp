export class ProjectRequest {
    projectId: number;
    projectName: string;
    projectDescription: string;
    ownerId: number;

    constructor(projectId: number, projectName: string, projectDescription: string, 
        ownerId: number){
        this.projectId = projectId;
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.ownerId = ownerId;
    }
}

export class ProjectRequest {
    projectName: string;
    projectDescription: string;
    ownerId: number;
    startDate: Date;
    endDate: Date;

    constructor(projectName: string, projectDescription: string, 
        ownerId: number, startDate: Date, endDate: Date){
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.ownerId = ownerId;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

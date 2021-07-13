export class TaskRequest{
    taskId: number;
    taskName: string;
    taskDescription: string;
    projectId: number;
    taskeeId: number;
    dueDate: Date;

    constructor(taskId: number, taskName: string, taskDescription: string, projectId: number, 
        taskeeId: number, dueDate: Date){
            this.taskId = taskId;
            this.taskName = taskName;
            this.taskDescription = taskDescription;
            this.projectId = projectId;
            this.taskeeId = taskeeId;
            this.dueDate = dueDate;
    }
}

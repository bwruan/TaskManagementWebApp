export class TaskRequest{
    taskId: number;
    taskName: string;
    taskDescription: string;
    projectId: number;
    taskeeId: number;
    isComplete: boolean;

    constructor(taskId: number, taskName: string, taskDescription: string, projectId: number, 
        taskeeId: number, isComplete: boolean){
            this.taskId = taskId;
            this.taskName = taskName;
            this.taskDescription = taskDescription;
            this.projectId = projectId;
            this.taskeeId = taskeeId;
            this.isComplete = isComplete;
    }
}

export class TaskRequest {
    taskId: number;
    taskName: string;
    taskDescription: string;
    projectId: number;
    taskerId: number;
    taskeeId: number;
    isCompleted: boolean;

    constructor(taskId: number, taskName: string, taskDescription: string, projectId: number, 
        taskerId: number, taskeeId: number, isCompleted: boolean){
            this.taskId = taskId;
            this.taskName = taskName;
            this.taskDescription = taskDescription;
            this.projectId = projectId;
            this.taskerId = taskerId;
            this.taskeeId = taskeeId;
            this.isCompleted = isCompleted;
    }
}

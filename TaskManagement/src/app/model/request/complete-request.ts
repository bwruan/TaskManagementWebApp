export class CompleteRequest {
    taskId: number;
    isComplete: boolean;

    constructor(taskId: number, isComplete: boolean){
        this.taskId = taskId;
        this.isComplete = isComplete;
    }
}

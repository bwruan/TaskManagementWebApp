import { Account } from "./account";
import { Project } from "./project";

export class Task {
    taskId: number;
    taskName: string;
    taskDescription: string;
    currentProject: Project;
    projectId: number;
    taskerId: number;
    taskeeId: number;
    isCompleted: boolean;
    taskerAccount: Account;
    taskeeAccount: Account;
    dueDate: Date;
}

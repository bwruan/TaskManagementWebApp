import { Account } from "./account";
import { Project } from "./project";

export class Task {
    taskId: number;
    taskName: string;
    taskDescription: string;
    currentProject: Project;
    projectId: number;
    isCompleted: boolean;
    taskeeId: number;
    taskeeAccount: Account;
    dueDate: Date;
    completedDate: Date;
}

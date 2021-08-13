import { Account } from "./account";

export class TaskComment {
   commentId: number;
   comment: string;
   taskId: number;
   commenterId: number;
   commenter: Account;
}

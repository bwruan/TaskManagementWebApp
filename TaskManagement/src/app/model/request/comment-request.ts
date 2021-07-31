export class CommentRequest {
   commentId: number;
   comment: string;
   taskId: number;
   commenterId: number;

   constructor(commentId: number, comment: string, taskId: number, commenterId: number){
    this.commentId = commentId;
    this.comment = comment;
    this.taskId = taskId;
    this.commenterId = commenterId;
    }
}

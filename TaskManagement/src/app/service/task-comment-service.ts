import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CommentRequest } from "../model/request/comment-request";

@Injectable({
    providedIn: 'root'
})

export class TaskCommentService {
    baseUrl: string = environment.taskApi;

    constructor(private _http: HttpClient){}

    createComment(commentObj: CommentRequest): Observable<any>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        return this._http.post(this.baseUrl + "/comment/create", commentObj, {headers: header});
    }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CompleteRequest } from "../model/request/complete-request";
import { Task } from "../model/task";

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    baseUrl: string = environment.taskApi;

    constructor(private _http: HttpClient){}

    getTasksByProjectId(projectId: number): Observable<Task[]>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });
        
        return this._http.get<Task[]>(this.baseUrl + "/task/project/" + projectId, {headers: header});
    }

    getTaskByTaskId(taskId: number): Observable<Task>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        return this._http.get<Task>(this.baseUrl + "/task/task/" + taskId, {headers: header});
    }

    markComplete(markCompleteObj : CompleteRequest){
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        return this._http.patch(this.baseUrl + "/task/complete", markCompleteObj, {headers: header});
    }
}

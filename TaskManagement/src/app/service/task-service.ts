import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseTaskRequest } from "../model/request/base-task-request";
import { TaskRequest } from "../model/request/task-request";
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

    markComplete(taskObj: BaseTaskRequest): Observable<any>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        return this._http.patch(this.baseUrl + "/task/complete", taskObj, {headers: header});
    }

    createTask(taskObj: TaskRequest): Observable<any>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        return this._http.post(this.baseUrl + "/task/create", taskObj, {headers: header});
    }

    deleteTask(taskId: number): Observable<any>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        return this._http.delete(this.baseUrl + "/task/delete/" + taskId, {headers: header});
    }
}

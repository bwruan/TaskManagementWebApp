import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Account } from "../model/account";
import { Project } from "../model/project";

@Injectable({
    providedIn: 'root'
})

export class UserToProjectService {
    baseUrl: string = environment.projectApi;

    constructor(private _http: HttpClient){}

    getAccountByProjectId(projectId: number): Observable<Account[]>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        return this._http.get<Account[]>(this.baseUrl + "/usertoproject/project/" + projectId, {headers: header});
    }

    getProjectsByAccountId(): Observable<Project[]>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        let accountId = localStorage.getItem("accountId");
        return this._http.get<Project[]>(this.baseUrl + "/usertoproject/account/" + accountId, {headers: header});
    }
}

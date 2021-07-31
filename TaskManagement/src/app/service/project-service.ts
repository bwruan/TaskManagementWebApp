import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Project } from "../model/project";
import { ProjectRequest } from "../model/request/project-request";

@Injectable({
    providedIn: 'root'
})

export class ProjectService {
    baseUrl: string = environment.projectApi;

    constructor(private _http: HttpClient){}

    createProject(newProject: ProjectRequest): Observable<any>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        return this._http.post(this.baseUrl + "/project/create", newProject, {headers: header});
    }

    getProjectById(projectId: number): Observable<Project>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        return this._http.get<Project>(this.baseUrl + "/project/" + projectId, {headers: header});
    }

    getProjectByName(name: string): Observable<Project>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });
        
        return this._http.get<Project>(this.baseUrl + "/project?name=" + name, {headers: header})
    }

    updateProject(updateProjObj : ProjectRequest){
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        return this._http.patch(this.baseUrl + "/project/update", updateProjObj, {headers: header});
    }

    deleteProject(projectId: number){
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        return this._http.delete(this.baseUrl + "/project/delete/" + projectId, {headers: header});
    }
}

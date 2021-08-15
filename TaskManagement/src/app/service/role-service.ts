import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Roles } from "../model/roles";

@Injectable({
    providedIn: 'root'
})

export class RoleService {
    baseUrl: string = environment.userApi;

    constructor(private _http: HttpClient){}

    getRoles(): Observable<Roles[]>{
        return this._http.get<Roles[]>(this.baseUrl + "/roles/roles");
    }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ObservableInput } from "rxjs";
import { environment } from "src/environments/environment";
import { Account } from "../model/account";
import { AccountInfoRequest } from "../model/request/account-info-request";
import { AccountRequest } from "../model/request/account-request";
import { LoginRequest } from "../model/request/login-request";
import { PasswordRequest } from "../model/request/password-request";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    baseUrl: string = environment.userApi;

    constructor(private _http: HttpClient){}

    createAccount(newAccount: AccountRequest): Observable<any>{
        return this._http.post(this.baseUrl + "/account/create", newAccount);
    }

    // uploadAccount(profilePicFile: File, accountId: number) : Observable<any>{
    //     let formData = new FormData();
    //     formData.append('file', profilePicFile);
    //     return this._http.put(this.baseUrl/ + "pro")
    // }

    logIn(loginObj: LoginRequest): Observable<any>{
        return this._http.patch(this.baseUrl + "/account/login", loginObj);
    }

    logOut(): Observable<any>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        let accountId = Number(localStorage.getItem("accountId"));
        let body = {Id: accountId};
        return this._http.patch(this.baseUrl + "/account/logout", body, {headers: header});
    }

    updateAccount(updateAcctObj: AccountInfoRequest): Observable<any>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });
        return this._http.put(this.baseUrl + "/account/userinfo", updateAcctObj, {headers: header});
    }

    updatePassword(passwordObj: PasswordRequest): Observable<any>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });
        return this._http.patch(this.baseUrl + "/account/password", passwordObj, {headers: header});
    }

    getAccountByEmail(): Observable<Account>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        let email = localStorage.getItem("email");
        return this._http.get<Account>(this.baseUrl + "/account?email=" + email, {headers: header});
    }

    getAccountById(): Observable<Account>{
        let token = localStorage.getItem("token");
        let header = new HttpHeaders({
            "Authorization": "Bearer "+ token
        });

        let id = localStorage.getItem("accountId");
        return this._http.get<Account>(this.baseUrl + "/account/" + id, {headers: header});
    }
}

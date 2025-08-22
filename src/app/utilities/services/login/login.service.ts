import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authentication } from '../../models/authentication';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:string = 'https://localhost:7216';
  errorMessage:any;
  private _http = inject(HttpClient);

  constructor() { }

  createUser(authentication: Authentication): Observable<any> {
    let url = `${this.url}/api/Login/AddUser`;
    let newLogin = JSON.stringify(authentication)
    var response = this._http.post<Authentication>(url, newLogin, httpOptions);
    console.log(url);
    return response;
  }

  AuthenticateUser(authentication: Authentication): Observable<any> {
    let url = `${this.url}/api/Login`;
    let newLogin = JSON.stringify(authentication)
    var response = this._http.post<Authentication>(url, newLogin, httpOptions);
    console.log(url);
    return response;
  }
}

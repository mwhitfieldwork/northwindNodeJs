import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Authentication } from '../../models/authentication';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private _http = inject(HttpClient);
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  url:string =  environment.apiUrl;
  errorMessage:any;
  token!:string | null;
  
  public get currentUser(): User | null {
    console.log(this.userSubject.getValue(), "User Gotten")
    return this.userSubject.getValue();
  }

  setUser(id:string, token:string): void {
      localStorage.setItem('user', JSON.stringify(id)); 
      localStorage.setItem('token', JSON.stringify(token)); 
  }

  getUser(userId: string): Observable<Authentication> {
    const tokenRaw = localStorage.getItem('token');
    const token = tokenRaw ? JSON.parse(tokenRaw) : null;
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    // Endpoint remains fixed to /api/Login/me since userId is derived from token
    const url = `${this.url}/login/me`;
  
    return this._http.get<Authentication>(url, { headers }).pipe(
      tap(response => {
        console.log("✅ This is the USER!!", response);
      }),
      catchError(this.handleError)
    );
  }
  

  private handleError(error: Response) {
    console.error(error);
    return throwError(() => error || 'Server error');
  }

}

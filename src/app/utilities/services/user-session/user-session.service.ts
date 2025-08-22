import { inject, Injectable, signal } from '@angular/core';
import { Authentication } from '../../models/authentication';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private _http = inject(HttpClient);
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  url:string = 'https://localhost:7216';
  errorMessage:any;
  
  public get currentUser(): User | null {
    console.log(this.userSubject.getValue(), "User Gotten")
    return this.userSubject.getValue();
  }

  setUser(id:string): void {
      localStorage.setItem('user', JSON.stringify(id)); 
  }

  getUser(userId: string): Observable<Authentication> {
    let url = `${this.url}/api/Login/${userId}`;
    var response = this._http.get<Authentication>(url)
      .pipe(
        tap(item => {
          console.log(item, "This is the USER!!")
        }),
        catchError(this.handleError),
      )

    return response
  }
  
  private handleError(error: Response) {
    console.error(error);
    return throwError(() => error || 'Server error');
  }

}

import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserSessionService } from '../services/user-session/user-session.service';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CalculateGuard implements CanActivate {
  private _userSessionService = inject(UserSessionService)
  userHasAccess!:number;
  
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const userId = localStorage.getItem('user');
  
    if (!userId) {
      this.router.navigate(['/dashboard']);
      return of(false);
    }
  
    return this._userSessionService.getUser(userId).pipe(
      map(response => {
        const hasAccess = response.data.user.admin === 1;
        if (!hasAccess) {
          this.router.navigate(['/dashboard']);
        }
        return hasAccess;
      }),
      catchError(() => {
        this.router.navigate(['/dashboard']);
        return of(false);
      })
    );
  }

}
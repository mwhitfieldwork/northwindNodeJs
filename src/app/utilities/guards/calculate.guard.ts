import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserSessionService } from '../services/user-session/user-session.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CalculateGuard implements CanActivate {
  private _userSessionService = inject(UserSessionService)
  userHasAccess!:boolean;
  
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const userId = localStorage.getItem('user');
    if (userId) {
      this._userSessionService.getUser(userId).subscribe((response) => {
        this.userHasAccess = response.admin === true;
      });
    }

    if (this.userHasAccess) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }

}
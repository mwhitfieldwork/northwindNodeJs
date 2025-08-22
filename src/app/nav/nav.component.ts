import { AfterViewInit, Component, computed, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UserSessionService } from '../utilities/services/user-session/user-session.service';
import { Authentication } from '../utilities/models/authentication';
import { SafelinkDirective } from '../utilities/directives/safe-link/safelink.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink, 
    SafelinkDirective
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements AfterViewInit {
 private  _userSessionService = inject(UserSessionService);
 private router = inject(Router);
 userId!:string;
 user!:Authentication | null;
 isLoggedIn:boolean = false

ngAfterViewInit(): void {
  const userId = localStorage.getItem('user');
  if (userId) {
      this.userId = JSON.parse(userId); 
  }
  this.getUser()
}


getUser(){
  if(this.userId) {
    this._userSessionService.getUser(this.userId).subscribe((response) => {
      this.user = response
      //console.log(response, "Response");
    });
  }

}

Logout() {
  localStorage.removeItem('user');
  this.user = null;
  this.router.navigate(['']).then(() => {
    window.location.reload();
});
}

}

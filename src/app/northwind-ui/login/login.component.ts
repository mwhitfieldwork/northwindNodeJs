import { Component, inject, ViewEncapsulation } from '@angular/core';
import { AuthLoginComponent } from "./auth-form/auth-form.component";
import { Authentication } from '../../utilities/models/authentication';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../utilities/services/login/login.service';
import { Router } from '@angular/router';
import { UserSessionService } from '../../utilities/services/user-session/user-session.service';
import { BasicButtonComponent } from '../../shared/basic-button/basic-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthLoginComponent, MatCardModule, BasicButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
private _loginService = inject(LoginService)
private _userSessionService = inject(UserSessionService)
private router = inject(Router)
signInErrorMessage = '';

constructor() {
  console.log('UserSessionService instance created');
}


  
  createUser($event:Authentication){
    this._loginService.createUser($event).subscribe((response) => {
      console.log(response);
    });
  }

  verifyUser($event:Authentication){
    this._loginService.AuthenticateUser($event).subscribe((response) => {
      if(response?.value?.message === "Authentication successful.") {
        this._userSessionService.setUser(response.value.user.pkid);
        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
      });
      } else{
        this.signInErrorMessage = response.value
      }
    });
  }

}

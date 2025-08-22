import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { DisplayLinkDirective } from './utilities/directives/auth/display-link.directive';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavComponent,
    MatSidenavModule, 
    MatListModule,
    MatToolbarModule, 
    MatIconModule,
    RouterLink,
    DisplayLinkDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'nwrevised';
  userId!:string | null;
  isLoggedIn = false
  private _router = inject(Router);

  ngOnInit(): void {
    this._router.events
    .pipe(
      // Only act on NavigationEnd events
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      // Use router.url to get the current address, e.g., '/dashboard'
      const currentUrl = event.urlAfterRedirects;
      console.log('Current URL:', currentUrl);

      // Update isLoggedIn based on your criteria
      // This example assumes a non-empty path means logged in.
      this.isLoggedIn = currentUrl !== '/' && currentUrl !== '';
    });

  }

}

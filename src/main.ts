import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withDebugTracing } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, 
  {providers:[provideHttpClient(),
    //provideRouter(routes, withDebugTracing()), //see routes in console
    provideRouter(routes), 
    provideAnimationsAsync()
  ]}
)
  .catch((err) => console.error(err));

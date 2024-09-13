import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

  
  bootstrapApplication(AppComponent, {
      providers: [provideHttpClient(),  provideRouter(routes), provideAnimationsAsync()]      
  }).catch((err) => console.error(err));


  


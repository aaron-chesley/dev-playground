import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { CardlyAuthenticationService } from '@playground/cardly-data';
import { CardlyUser } from '@playground/cardly-util';

export const initializeApplication = (authService: CardlyAuthenticationService) => {
  return (): Promise<CardlyUser> => {
    return authService.getUser();
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApplication,
      multi: true,
      deps: [CardlyAuthenticationService],
    },
    provideRouter(appRoutes),
  ],
};

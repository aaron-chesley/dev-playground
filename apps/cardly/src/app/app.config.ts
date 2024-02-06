import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { PlayModalModule } from '@playground/play-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes),
    importProvidersFrom(JwtModule.forRoot({})),
    importProvidersFrom(PlayModalModule),
  ],
};

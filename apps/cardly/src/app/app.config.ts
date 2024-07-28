import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { JwtModule } from '@auth0/angular-jwt';
import { appRoutes } from './app.routes';
import { PlayModalModule } from '@playground/play-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore(),
    importProvidersFrom(StoreDevtoolsModule.instrument()),
    importProvidersFrom(JwtModule.forRoot({})),
    importProvidersFrom(PlayModalModule),
    importProvidersFrom(ServiceWorkerModule.register('/ngsw-worker.js', { enabled: true })),
  ],
};

import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideState, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { JwtModule } from '@auth0/angular-jwt';
import { appRoutes } from './app.routes';
import { PlayModalModule } from '@playground/play-ui';
import { AuthenticationEffects, authenticationFeatureKey, authenticationReducer } from '@playground/cardly-data';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore(),
    importProvidersFrom(StoreDevtoolsModule.instrument()),
    importProvidersFrom(JwtModule.forRoot({})),
    importProvidersFrom(PlayModalModule),
    importProvidersFrom(ServiceWorkerModule.register('/ngsw-worker.js', { enabled: !isDevMode() })),
    provideState({ name: authenticationFeatureKey, reducer: authenticationReducer }),
    provideEffects(AuthenticationEffects),
  ],
};

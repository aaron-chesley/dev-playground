import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { SCUM_API_SERVICE, ScumGameEffects, scumGameReducer, ScumHttpApiService } from '@playground/cardly-data';
import { provideEffects } from '@ngrx/effects';
import { CardlyAuthenticationGuard } from '../cardly-authentication.guard';

export const scumRoutes: Route[] = [
  {
    path: '',
    canMatch: [CardlyAuthenticationGuard],
    loadComponent: () => import('@cardly/cardly-features').then((c) => c.ScumLobbyFeatureComponent),
    providers: [
      {
        provide: SCUM_API_SERVICE,
        useClass: ScumHttpApiService,
      },
      provideState({ name: 'scum', reducer: scumGameReducer }),
      provideEffects(ScumGameEffects),
    ],
  },
  {
    path: ':gameId',
    loadComponent: () => import('@cardly/cardly-features').then((c) => c.ScumGameBoardFeatureComponent),
  },
];

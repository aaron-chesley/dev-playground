import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { CardlyAuthenticationGuard } from '../cardly-authentication.guard';
import { ScumGameEffects, scumGameReducer } from '@playground/cardly-data';
import { provideEffects } from '@ngrx/effects';

export const scumRoutes: Route[] = [
  {
    path: '',
    canActivate: [CardlyAuthenticationGuard],
    loadComponent: () => import('@cardly/cardly-features').then((c) => c.ScumLobbyFeatureComponent),
    providers: [provideState({ name: 'scum', reducer: scumGameReducer }), provideEffects(ScumGameEffects)],
  },
  {
    path: ':gameId',
    canActivate: [CardlyAuthenticationGuard],
    loadComponent: () => import('@cardly/cardly-features').then((c) => c.ScumGameBoardFeatureComponent),
  },
];

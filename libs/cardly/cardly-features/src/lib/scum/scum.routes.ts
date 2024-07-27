import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { CardlyAuthenticationGuard } from '../cardly-authentication.guard';
import { scumGameReducer } from '@playground/cardly-data';

export const scumRoutes: Route[] = [
  {
    path: '',
    canActivate: [CardlyAuthenticationGuard],
    loadComponent: () => import('@cardly/cardly-features').then((c) => c.ScumLobbyFeatureComponent),
    providers: [provideState({ name: 'scum', reducer: scumGameReducer })],
  },
  {
    path: ':gameId',
    canActivate: [CardlyAuthenticationGuard],
    loadComponent: () => import('@cardly/cardly-features').then((c) => c.ScumGameBoardFeatureComponent),
  },
];

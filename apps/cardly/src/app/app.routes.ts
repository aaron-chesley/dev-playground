import { Route } from '@angular/router';
import { CardlyAuthenticationGuard } from '@cardly/cardly-features';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'scum',
  },
  {
    path: 'scum',
    canActivate: [CardlyAuthenticationGuard],
    loadComponent: () => import('@cardly/cardly-features').then((c) => c.ScumLobbyFeatureComponent),
  },
  {
    path: 'scum/:gameId',
    canActivate: [CardlyAuthenticationGuard],
    loadComponent: () => import('@cardly/cardly-features').then((c) => c.ScumGameBoardFeatureComponent),
  },
];

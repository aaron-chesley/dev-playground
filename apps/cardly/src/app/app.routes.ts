import { Route } from '@angular/router';
import { CardlyAuthenticationGuard } from '@cardly/cardly-features';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'scum',
  },
  {
    path: 'login',
    loadComponent: () => import('@cardly/cardly-features').then((r) => r.CardlyLoginFeatureComponent),
  },
  {
    path: 'scum',
    canMatch: [CardlyAuthenticationGuard],
    loadChildren: () => import('@cardly/cardly-features').then((r) => r.scumRoutes),
  },
];

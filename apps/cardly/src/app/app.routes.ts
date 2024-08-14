import { Route } from '@angular/router';

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
    loadChildren: () => import('@cardly/cardly-features').then((r) => r.scumRoutes),
  },
];

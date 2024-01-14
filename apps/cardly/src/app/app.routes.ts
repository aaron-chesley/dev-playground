import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'scum',
  },
  {
    path: 'scum',
    loadComponent: () => import('@cardly/cardly-features').then((c) => c.ScumGameBoardFeatureComponent),
  },
];

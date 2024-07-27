import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'scum',
  },
  {
    path: 'scum',
    loadChildren: () => import('@cardly/cardly-features').then((r) => r.scumRoutes),
  },
];

import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'kalshi',
  },
  {
    path: 'kalshi',
    loadChildren: () =>
      import('@playground/kalshi-features').then((m) => m.KALSHI_ROUTES),
  },
];

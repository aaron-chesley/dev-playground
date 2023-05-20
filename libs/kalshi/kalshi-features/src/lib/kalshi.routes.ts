import { Routes } from '@angular/router';
import { KlsFeatComponent } from './kalshi-feature/kalshi-feat.component';
import { kalshiReducer } from './state/kalshi.reducer';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { KalshiEffects } from './state/kalshi.effects';

export const KALSHI_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState('kalshi', kalshiReducer),
      // provideEffects(KalshiEffects),
    ],
    component: KlsFeatComponent,
  },
];

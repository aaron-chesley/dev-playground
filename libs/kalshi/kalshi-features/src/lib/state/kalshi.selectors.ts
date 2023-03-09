import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KalshiState } from './kalshi.reducer';

export const selectKalshiState = createFeatureSelector<KalshiState>('kalshi');

export const selectMarketEvent = createSelector(
  selectKalshiState,
  (state) => state.marketEvent
);

import { createReducer, on } from '@ngrx/store';
import { KlsMarketEvent } from '@playground/kalshi-util';
import { marketDataUpdate } from './kalshi.actions';

export interface KalshiState {
  marketEvent: KlsMarketEvent;
}
export const initialState: KalshiState = {
  marketEvent: null,
};

export const kalshiReducer = createReducer(
  initialState,
  on(marketDataUpdate, (state, { payload }) => {
    return { ...state, marketEvent: payload.event };
  })
);

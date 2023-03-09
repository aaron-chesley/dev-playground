import { createAction, props } from '@ngrx/store';
import { KlsMarketEvent } from '@playground/kalshi-util';

export const marketDataUpdate = createAction(
  '[Kalshi Api] Market Data Update',
  props<{
    messageType: string;
    payload: { event: KlsMarketEvent };
  }>()
);

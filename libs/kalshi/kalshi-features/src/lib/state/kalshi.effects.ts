import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { KalshiWebsocketService } from '@playground/kalshi-data';

@Injectable()
export class KalshiEffects {
  constructor(
    private actions$: Actions,
    private kalshiWebsocketService: KalshiWebsocketService
  ) {}
}

import { InjectionToken } from '@angular/core';
import { CreateNewGameSuccess, JoinGamePayload, JoinGameSuccess } from '@playground/cardly-util';
import { Observable } from 'rxjs';

export const SCUM_API_SERVICE = new InjectionToken<ScumApiService>('SCUM_API_SERVICE');

export interface ScumApiService {
  createNewGame(): Observable<CreateNewGameSuccess>;
  joinGame(payload: JoinGamePayload): Observable<JoinGameSuccess>;
}

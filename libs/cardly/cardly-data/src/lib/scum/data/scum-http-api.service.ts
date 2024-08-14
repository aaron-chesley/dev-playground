import { Observable } from 'rxjs';
import { ScumApiService } from './scum-api-service.interface';
import { CreateNewGameSuccess, JoinGamePayload, JoinGameSuccess } from '@playground/cardly-util';
import { ApiService } from '@playground/shared/shared-data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScumHttpApiService implements ScumApiService {
  createNewGame(): Observable<CreateNewGameSuccess> {
    return this.http.post<CreateNewGameSuccess>(`create-game`, {});
  }

  joinGame(payload: JoinGamePayload): Observable<JoinGameSuccess> {
    return this.http.post<JoinGameSuccess>(`join-game`, payload);
  }

  constructor(private http: ApiService) {}
}

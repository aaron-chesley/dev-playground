import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { CardlyWebsocketService } from '../../cardly';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, map, withLatestFrom, tap } from 'rxjs/operators';
import * as ScumGameActions from './scum.actions';
import {
  CreateNewGameResponse,
  JoinGameResponse,
  PlayCardsRequest,
  PassTurnRequest,
  StartNewRoundRequest,
  SwapCardsRequest,
  JoinGameRequest,
  ScumGameUI,
} from '@playground/cardly-util';
import { Store } from '@ngrx/store';
import { selectScumGameState } from './scum.selectors';

@Injectable()
export class ScumGameEffects {
  createNewGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.createNewGame),
        switchMap((action) => this.cardlyWebsocket.sendMessage('createNewGame', {})),
      ),
    { dispatch: false },
  );

  joinGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.joinGame),
        switchMap(({ gameId }) => {
          const payload: JoinGameRequest = { gameId };
          return this.cardlyWebsocket.sendMessage('joinGame', payload).pipe(
            map((res: JoinGameResponse) => {
              this.router.navigate(['scum', res.gameId]);
            }),
          );
        }),
      ),
    { dispatch: false },
  );

  startGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.startGame),
        switchMap(({ gameId }) => this.cardlyWebsocket.sendMessage('startGame', { gameId })),
      ),
    { dispatch: false },
  );

  playCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScumGameActions.playCards),
      withLatestFrom(this.store.select(selectScumGameState)),
      switchMap(([action, state]) => {
        const stagedCardIndices = state.stagedCardIndices;
        const cards = stagedCardIndices.map((index) => state.gameState.hand[index]);
        const payload: PlayCardsRequest = { gameId: action.gameId, cards };
        return this.cardlyWebsocket
          .sendMessage('playCards', payload)
          .pipe(map(() => ScumGameActions.clearStagedCards()));
      }),
    ),
  );

  passTurn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.passTurn),
        switchMap((action) => {
          const payload: PassTurnRequest = { gameId: action.gameId };
          this.store.dispatch(ScumGameActions.clearStagedCards());
          return this.cardlyWebsocket.sendMessage('passTurn', payload);
        }),
      ),
    { dispatch: false },
  );

  startNewRound$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.startNewRound),
        switchMap((action) => {
          const payload: StartNewRoundRequest = { gameId: action.gameId };
          return this.cardlyWebsocket.sendMessage('startNewRound', payload);
        }),
      ),
    { dispatch: false },
  );

  swapCards$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.swapCards),
        withLatestFrom(this.store.select(selectScumGameState)),
        switchMap(([action, state]) => {
          const cards = state.stagedCardIndices.map((index) => state.gameState.hand[index]);
          const payload: SwapCardsRequest = { gameId: action.gameId, cards };
          this.store.dispatch(ScumGameActions.clearStagedCards());
          return this.cardlyWebsocket.sendMessage('swapCards', payload);
        }),
      ),
    { dispatch: false },
  );

  subscribeToGameUpdates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScumGameActions.subscribeToGameUpdates),
      switchMap((action) => this.cardlyWebsocket.sendMessage('subscribeToGameUpdates', { gameId: action.gameId })),
      map(() => ScumGameActions.noopAction()),
    ),
  );

  onGameJoined$ = createEffect(() =>
    this.cardlyWebsocket.receiveMessage('gameJoined').pipe(
      tap((res: JoinGameResponse) => this.router.navigate(['scum', res.gameId])),
      map(() => ScumGameActions.noopAction()),
    ),
  );

  onCreateNewGame$ = createEffect(() =>
    this.cardlyWebsocket.receiveMessage('newGameCreated').pipe(
      tap((res: CreateNewGameResponse) => this.router.navigate(['scum', res.gameId])),
      map(() => ScumGameActions.noopAction()),
    ),
  );

  onGameUpdate$ = createEffect(() =>
    this.cardlyWebsocket
      .receiveMessage('gameStateUpdate')
      .pipe(map((gameState: ScumGameUI) => ScumGameActions.updateGameState({ gameState }))),
  );

  constructor(
    private actions$: Actions,
    private cardlyWebsocket: CardlyWebsocketService,
    private router: Router,
    private store: Store,
  ) {}
}

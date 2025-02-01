import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { CardlyWebsocketService } from '../../cardly';
import { of } from 'rxjs';
import { map, withLatestFrom, tap } from 'rxjs/operators';
import * as ScumGameActions from './scum.actions';
import {
  CreateNewGameSuccess,
  JoinGamePayload,
  CreateNewGamePayload,
  SubscribeToGameUpdatesPayload,
  StartGamePayload,
  PlayCardsPayload,
  PassTurnPayload,
  StartNewRoundPayload,
  SwapCardsPayload,
  UnsubscribeFromGameUpdatesPayload,
  LeaveGamePayload,
} from '@playground/cardly-util';
import { Store } from '@ngrx/store';
import { selectGameState, selectScumGameState } from './scum.selectors';
import { PlayModalService, PlaySnackbarService } from '@playground/play-ui';
import { ScumTrickWinnerComponent } from '@playground/cardly-ui';

@Injectable()
export class ScumGameEffects {
  gameId$ = this.store.select(selectGameState).pipe(map((state) => state.gameId));

  constructor(
    private actions$: Actions,
    private cardlyWebsocket: CardlyWebsocketService,
    private router: Router,
    private store: Store,
    private snackbarService: PlaySnackbarService,
    private modal: PlayModalService,
  ) {}

  createNewGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.createNewGame),
        tap((_) => {
          const payload = new CreateNewGamePayload().toSerializedObject();
          this.cardlyWebsocket.sendGameMessage(payload);
        }),
      ),
    { dispatch: false },
  );

  createNewGameSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.createNewGameSuccess),
        tap(({ data }) => this.router.navigate(['scum', data.gameId])),
      ),
    { dispatch: false },
  );

  subscribeToGameUpdates$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.subscribeToGameUpdates),
        tap(({ gameId }) => {
          const payload = new SubscribeToGameUpdatesPayload(gameId).toSerializedObject();
          this.cardlyWebsocket.sendGameMessage(payload);
        }),
      ),
    { dispatch: false },
  );

  unsubscribeFromGameUpdates$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.unsubscribeFromGameUpdates),
        withLatestFrom(this.gameId$),
        tap(([_, gameId]) => {
          const payload = new UnsubscribeFromGameUpdatesPayload(gameId).toSerializedObject();
          this.cardlyWebsocket.sendGameMessage(payload);
        }),
      ),
    { dispatch: false },
  );

  joinGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.joinGame),
        tap(({ gameId }) => {
          const payload = new JoinGamePayload(gameId).toSerializedObject();
          this.cardlyWebsocket.sendGameMessage(payload);
        }),
      ),
    { dispatch: false },
  );

  joinGameSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.joinGameSuccess),
        map(({ data }) => this.router.navigate(['scum', data.gameId])),
      ),
    { dispatch: false },
  );

  leaveGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.leaveGame),
        withLatestFrom(this.gameId$),
        tap(([_, gameId]) => {
          const payload = new LeaveGamePayload(gameId).toSerializedObject();
          this.cardlyWebsocket.sendGameMessage(payload);
          this.router.navigate(['scum']);
        }),
      ),
    { dispatch: false },
  );

  startGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.startGame),
        withLatestFrom(this.gameId$),
        tap(([_, gameId]) => {
          const payload = new StartGamePayload(gameId).toSerializedObject();
          this.cardlyWebsocket.sendGameMessage(payload);
        }),
      ),
    { dispatch: false },
  );

  playCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScumGameActions.playCards),
      withLatestFrom(this.store.select(selectScumGameState)),
      map(([_, state]) => {
        const stagedCardIndices = state.stagedCardIndices;
        const cards = stagedCardIndices.map((index) => state.gameState.hand[index]);
        const payload = new PlayCardsPayload({ gameId: state.gameState.gameId, cards }).toSerializedObject();
        this.cardlyWebsocket.sendGameMessage(payload);
        return ScumGameActions.clearStagedCards();
      }),
    ),
  );

  passTurn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.passTurn),
        withLatestFrom(this.store.select(selectGameState)),
        map(([_, state]) => {
          const gameId = state.gameId;
          // Access the store to get the discard pile. If there aren't any then the user can't pass their turn.
          const discardPile = state.discardPile;
          if (discardPile.length === 0) {
            this.snackbarService.open({
              title: 'Cannot pass turn',
              message: 'The first player of the round cannot pass their turn.',
              severity: 'info',
              position: 'center-center',
            });
            return of(ScumGameActions.noopAction());
          }
          const payload = new PassTurnPayload(gameId).toSerializedObject();
          this.cardlyWebsocket.sendGameMessage(payload);
          return this.store.dispatch(ScumGameActions.clearStagedCards());
        }),
      ),
    { dispatch: false },
  );

  scumTrickWon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.scumTrickWon),
        map(({ data }) => {
          this.modal.custom(ScumTrickWinnerComponent, {
            data: data.trickWinner,
          });
        }),
      ),
    { dispatch: false },
  );

  startNewRound$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScumGameActions.startNewRound),
        withLatestFrom(this.gameId$),
        tap(([_, gameId]) => {
          const payload = new StartNewRoundPayload(gameId).toSerializedObject();
          this.cardlyWebsocket.sendGameMessage(payload);
        }),
      ),
    { dispatch: false },
  );

  swapCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScumGameActions.swapCards),
      withLatestFrom(this.store.select(selectScumGameState)),
      map(([_, state]) => {
        const gameId = state.gameState.gameId;
        const cards = state.stagedCardIndices.map((index) => state.gameState.hand[index]);
        const payload = new SwapCardsPayload({ gameId, cards }).toSerializedObject();
        this.cardlyWebsocket.sendGameMessage(payload);
        return this.store.dispatch(ScumGameActions.clearStagedCards());
      }),
    ),
  );
}

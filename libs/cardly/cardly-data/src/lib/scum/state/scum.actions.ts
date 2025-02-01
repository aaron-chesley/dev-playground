import { createAction, props } from '@ngrx/store';
import { CreateNewGameSuccess, JoinGameSuccess, GameUpdate, ScumTrickWon } from '@playground/cardly-util';
import { ScumTrickWinner } from '@playground/cardly-util';
import { Serialized } from '@playground/shared/util/typescript';

// Game State Actions
export const createNewGame = createAction('[Scum Game] Create New Game');
export const createNewGameSuccess = createAction(
  '[ws] CreateNewGameSuccess',
  props<{ data: Serialized<CreateNewGameSuccess> }>(),
);

export const joinGame = createAction('[Scum Game] Join Game', props<{ gameId: string }>());
export const joinGameSuccess = createAction('[ws] JoinGameSuccess', props<{ data: Serialized<JoinGameSuccess> }>());
export const joinGameFailure = createAction('[Scum Game] Join Game Failure');

export const leaveGame = createAction('[Scum Game] Leave Game');

export const startGame = createAction('[Scum Game] Start Game');
export const playCards = createAction('[Scum Game] Play Cards');
export const passTurn = createAction('[Scum Game] Pass Turn');
export const startNewRound = createAction('[Scum Game] Start New Round');
export const swapCards = createAction('[Scum Game] Swap Cards');
export const subscribeToGameUpdates = createAction(
  '[Scum Game] Subscribe To Game Updates',
  props<{ gameId: string }>(),
);
export const unsubscribeFromGameUpdates = createAction('[Scum Game] Unsubscribe From Game Updates');
export const updateGameState = createAction('[ws] GameUpdate', props<{ data: Serialized<GameUpdate> }>());
export const clearState = createAction('[Scum Game] Clear State');
export const scumTrickWon = createAction('[ws] ScumTrickWon', props<{ data: Serialized<ScumTrickWon> }>());
export const noopAction = createAction('[Noop] No Operation');

// Staged Card Actions
export const stageCard = createAction('[Scum Game] Stage Card', props<{ cardIndex: number }>());
export const unstageCard = createAction('[Scum Game] Unstage Card', props<{ cardIndex: number }>());
export const clearStagedCards = createAction('[Scum Game] Clear Staged Cards');

import { createAction, props } from '@ngrx/store';
import {
  CreateNewGameResponse,
  JoinGameRequest,
  JoinGameResponse,
  ScumGameUI,
  PlayCardsRequest,
  PassTurnRequest,
  StartNewRoundRequest,
  SwapCardsRequest,
  ScumTrickWinner,
} from '@playground/cardly-util';

// Game State Actions
export const createNewGame = createAction('[Scum Game] Create New Game');
export const joinGame = createAction('[Scum Game] Join Game', props<{ gameId: string }>());
export const startGame = createAction('[Scum Game] Start Game', props<{ gameId: string }>());
export const playCards = createAction('[Scum Game] Play Cards', props<{gameId: string}>());
export const passTurn = createAction('[Scum Game] Pass Turn', props<PassTurnRequest>());
export const startNewRound = createAction('[Scum Game] Start New Round', props<StartNewRoundRequest>());
export const swapCards = createAction('[Scum Game] Swap Cards', props<{gameId: string}>());
export const subscribeToGameUpdates = createAction('[Scum Game] Subscribe To Game Updates', props<{ gameId: string }>());
export const unsubscribeFromGameUpdates = createAction('[Scum Game] Unsubscribe From Game Updates', props<{ gameId: string }>());
export const updateGameState = createAction('[Scum Game] Update Game State', props<{ gameState: ScumGameUI }>());
export const clearState = createAction('[Scum Game] Clear State');
export const noopAction = createAction('[Noop] No Operation');

// Staged Card Actions
export const stageCard = createAction('[Scum Game] Stage Card', props<{ cardIndex: number }>());
export const unstageCard = createAction('[Scum Game] Unstage Card', props<{ cardIndex: number }>());
export const clearStagedCards = createAction('[Scum Game] Clear Staged Cards');

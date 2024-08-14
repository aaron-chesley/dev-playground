import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScumGameState } from './scum.reducer';

export const selectScumGameState = createFeatureSelector<ScumGameState>('scum');

export const selectGameState = createSelector(selectScumGameState, (state: ScumGameState) => state.gameState);

export const selectIsLoading = createSelector(selectScumGameState, (state: ScumGameState) => state.loading);

export const selectStagedCardIndices = createSelector(
  selectScumGameState,
  (state: ScumGameState) => state.stagedCardIndices,
);

export const selectTrickWinner = createSelector(selectGameState, (gameState) => gameState.trickWinner);

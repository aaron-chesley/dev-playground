import { createReducer, on } from '@ngrx/store';
import { ScumGameUI, getInitialScumGameUI, ScumTrickWinner } from '@playground/cardly-util';
import * as ScumGameActions from './scum.actions';

export interface ScumGameState {
  gameState: ScumGameUI;
  stagedCardIndices: number[];
}

const initialState: ScumGameState = {
  gameState: getInitialScumGameUI(),
  stagedCardIndices: [],
};

export const scumGameReducer = createReducer(
  initialState,
  on(ScumGameActions.updateGameState, (state, { gameState }) => ({ ...state, gameState })),
  on(ScumGameActions.clearState, () => initialState),
  on(ScumGameActions.stageCard, (state, { cardIndex }) => {
    const { hand, phase, discardPile, requiredDiscardSize } = state.gameState;
    const stagedCardIndices = state.stagedCardIndices;

    if (phase === 'IN_PROGRESS') {
      if (requiredDiscardSize && stagedCardIndices.length >= requiredDiscardSize) {
        return state;
      }
      if (discardPile.length && hand[cardIndex].order <= discardPile[discardPile.length - 1].cards[0].order) {
        return state;
      }
      if (stagedCardIndices.length && hand[stagedCardIndices[0]].rank !== hand[cardIndex].rank) {
        return state;
      }
    }

    return { ...state, stagedCardIndices: [...stagedCardIndices, cardIndex] };
  }),
  on(ScumGameActions.unstageCard, (state, { cardIndex }) => {
    const stagedCards = [...state.stagedCardIndices];
    try {
      stagedCards.splice(cardIndex, 1);
    } catch (e) {
      console.error('Error removing card from staged cards', e);
    }
    return { ...state, stagedCardIndices: [...stagedCards] };
  }),
  on(ScumGameActions.clearStagedCards, (state) => ({ ...state, stagedCardIndices: [] })),
);

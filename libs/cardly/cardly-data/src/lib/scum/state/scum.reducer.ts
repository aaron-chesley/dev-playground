import { createReducer, on } from '@ngrx/store';
import { ScumGameUI, getInitialScumGameUI } from '@playground/cardly-util';
import * as ScumGameActions from './scum.actions';

export interface ScumGameState {
  gameState: ScumGameUI;
  stagedCardIndices: number[];
  loading: boolean;
}

const initialState: ScumGameState = {
  gameState: getInitialScumGameUI(),
  stagedCardIndices: [],
  loading: false,
};

export const scumGameReducer = createReducer(
  initialState,
  on(ScumGameActions.createNewGame, ScumGameActions.joinGame, (state) => ({ ...state, loading: true })),
  on(ScumGameActions.createNewGameSuccess, (state, { data }) => ({
    ...state,
    gameState: { ...state.gameState, gameId: data.gameId },
  })),
  on(ScumGameActions.joinGameSuccess, (state, { data }) => ({
    ...state,
    gameState: { ...state.gameState, gameId: data.gameId },
  })),
  on(
    ScumGameActions.createNewGameSuccess,
    ScumGameActions.joinGameSuccess,
    ScumGameActions.joinGameFailure,
    (state) => ({
      ...state,
      loading: false,
    }),
  ),

  on(ScumGameActions.updateGameState, (state, { data }) => ({ ...state, gameState: data.gameState })),
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
  on(ScumGameActions.clearStagedCards, (state) => ({ ...state, stagedCardIndices: [] as number[] })),
);

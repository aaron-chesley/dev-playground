import { Card, CardlyUser } from '../cardly';
import { ScumGamePhase } from './scum-game-phase.enum';

export interface ScumGameState {
  gameId: string;
  gameOwnerUserId: string;
  hand: Card[];
  discardPile: Card[];
  numOfCardsRequiredToPlay: number;
  phase: ScumGamePhase;
  currentUserTurnId: string;
  presidentTraded: boolean;
  vicePresidentTraded: boolean;
  finishOrderIds: string[];
  players: {
    user: CardlyUser;
    numOfCards: number;
    passed: boolean;
    finished: boolean;
  }[];
}

export const getInitialScumGameState = (): ScumGameState => {
  return {
    gameId: '',
    gameOwnerUserId: '',
    hand: [],
    discardPile: [],
    numOfCardsRequiredToPlay: 1,
    phase: ScumGamePhase.PREGAME,
    currentUserTurnId: '',
    presidentTraded: false,
    vicePresidentTraded: false,
    finishOrderIds: [],
    players: [],
  };
};

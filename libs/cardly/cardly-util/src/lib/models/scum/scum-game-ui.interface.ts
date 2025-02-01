import { Card, CardlyUser } from '../cardly';
import { ScumGamePhase } from './scum-game-phase.enum';
import { ScumDiscardPile, ScumTrick } from './scum-trick.interface';

export interface ScumPlayerUI extends CardlyUser {
  numOfCards: number;
  passed: boolean;
  finishOrder: number;
  turnOrder: number;
}

export interface ScumTrickWinner {
  id: string;
  name: string;
  cards: Card[];
}

export interface ScumGameUI {
  gameId: string;
  gameOwnerUserId: string;
  hand: Card[];
  discardPile: ScumDiscardPile[];
  requiredDiscardSize: number;
  phase: ScumGamePhase;
  currentUserTurnId: string;
  presidentTraded: boolean;
  vicePresidentTraded: boolean;
  players: { [userId: string]: ScumPlayerUI };
}

export const getInitialScumGameUI = (): ScumGameUI => {
  return {
    gameId: '',
    gameOwnerUserId: '',
    hand: [],
    discardPile: [],
    requiredDiscardSize: undefined,
    phase: ScumGamePhase.PREGAME,
    currentUserTurnId: '',
    presidentTraded: false,
    vicePresidentTraded: false,
    players: {},
  };
};

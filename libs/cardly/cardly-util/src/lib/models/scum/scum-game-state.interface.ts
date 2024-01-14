import { Card, CardlyUser } from '../cardly';
import { ScumGamePhase } from './scum-game-phase.enum';

export interface ScumGameState {
  gameOwnerUserId: string;
  hand: Card[];
  discardPile: Card[];
  numOfCardsRequiredToPlay: number;
  phase: ScumGamePhase;
  currentUserTurnId: string;
  presidentTraded: boolean;
  vicePresidentTraded: boolean;
  players: {
    user: CardlyUser;
    numOfCards: number;
    passed: boolean;
    finished: boolean;
  }[];
}

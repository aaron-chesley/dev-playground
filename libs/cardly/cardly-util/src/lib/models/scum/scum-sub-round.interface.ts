import { Card } from '../cardly';

export interface ScumSubRound {
  turnOrderIds: string[];
  currentUserTurnId: string;
  numOfCardsRequiredToPlay: number;
  discardPile: Card[];
  players: { [userId: string]: { passed: boolean; hadAleastOneTurn: boolean } };
}

export const getScumSubRound = (): ScumSubRound => ({
  turnOrderIds: [],
  currentUserTurnId: '',
  numOfCardsRequiredToPlay: 0,
  discardPile: [],
  players: {},
});

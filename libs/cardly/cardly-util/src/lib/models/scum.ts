import { Card, CardlyUser } from './cardly';

export interface ScumPlayer {
  user: CardlyUser;
  rank: ScumRank;
  cards: Card[];
  score: number;
  pass: boolean;
  playedAtleastOneCardInSubRound: boolean;
}

export enum ScumRank {
  SCUM = -2,
  VICE_SCUM = -1,
  PEASANT = 0,
  VICE_PRESIDENT = 1,
  PRESIDENT = 2,
}

export interface ScumGame {
  id: string;
  gameOwnerId: string;
  subRoundWinnerId: string;
  roundWinnerId: string;
  presidentTraded: boolean;
  vicePresidentTraded: boolean;
  gameWinnerId: string;
  pointsToWin: number;
  state: ScumGameState;
  players: ScumPlayer[];
  playersFinishedOrder: string[];
  discardPile: Card[];
  lastPlayerToDiscardId: string;
  currentPlayerId: string;
  currentCardStackSize: number;
}

export enum ScumGameState {
  PREGAME = 'PREGAME',
  CARD_SWAP = 'CARD_SWAP',
  IN_PROGRESS = 'IN_PROGRESS',
  POSTGAME = 'POSTGAME',
}

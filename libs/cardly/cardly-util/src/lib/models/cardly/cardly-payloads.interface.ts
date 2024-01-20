import { Card } from './card.interface';
import { CardlyUser } from './cardly-user.interface';

export interface CreateNewGameRequest {
  user: CardlyUser;
}

export interface CreateNewGameResponse {
  gameId: string;
}

export interface JoinGameRequest {
  user: CardlyUser;
  gameId: string;
}

export interface JoinGameResponse {
  gameId: string;
}

export interface StartGameRequest {
  gameId: string;
}

export interface PlayCardsRequest {
  gameId: string;
  userId: string;
  cards: Card[];
}

export interface PassTurnRequest {
  gameId: string;
  userId: string;
}

export interface StartNewRoundRequest {
  gameId: string;
}

export interface SwapCardsRequest {
  gameId: string;
  userId: string;
  cards: Card[];
}

export interface SubscribeToGameUpdatesRequest {
  gameId: string;
  userId: string;
}

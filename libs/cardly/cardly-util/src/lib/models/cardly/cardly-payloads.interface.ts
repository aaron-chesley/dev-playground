import { Card } from './card.interface';

export interface CreateNewGameResponse {
  gameId: string;
}

export interface JoinGameRequest {
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
  cards: Card[];
}

export interface PassTurnRequest {
  gameId: string;
}

export interface StartNewRoundRequest {
  gameId: string;
}

export interface SwapCardsRequest {
  gameId: string;
  cards: Card[];
}

export interface SubscribeToGameUpdatesRequest {
  gameId: string;
}

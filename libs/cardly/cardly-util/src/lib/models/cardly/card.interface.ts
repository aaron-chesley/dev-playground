import { Rank } from './rank.enum';
import { Suit } from './suit.enum';

export interface Card {
  readonly suit: Suit;
  readonly rank: Rank;
  readonly numericalRank: number;
  readonly order: number;
}

export const sortCardsByOrder = (cardA: Card, cardB: Card): number => {
  return cardA.order - cardB.order;
};

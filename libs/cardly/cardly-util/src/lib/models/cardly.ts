export interface CardlyUser {
  id: string;
  displayName: string;
  avatar: string;
}

export enum Suit {
  CLUBS = 'clubs',
  DIAMONDS = 'diamonds',
  HEARTS = 'hearts',
  SPADES = 'spades',
}

export enum Rank {
  TWO = 2,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE,
}

export interface Card {
  show: boolean;
  suit: Suit;
  rank: Rank;
}

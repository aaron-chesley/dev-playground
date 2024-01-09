import {
  Card,
  CardlyUser,
  ScumGame,
  ScumPlayer,
  Suit,
} from '@playground/cardly-util';

export const deckOfCards: Card[] = [
  {
    show: true,
    rank: {
      displayValue: 'A',
      value: 14,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: '5',
      value: 5,
    },
    suit: Suit.HEARTS,
  },
  {
    show: true,
    rank: {
      displayValue: '8',
      value: 8,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: '9',
      value: 9,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: 'Q',
      value: 12,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: '2',
      value: 2,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: '2',
      value: 2,
    },
    suit: Suit.HEARTS,
  },
  {
    show: true,
    rank: {
      displayValue: '7',
      value: 7,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: '4',
      value: 4,
    },
    suit: Suit.HEARTS,
  },
  {
    show: true,
    rank: {
      displayValue: '5',
      value: 5,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: 'Q',
      value: 12,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: '5',
      value: 5,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: '10',
      value: 10,
    },
    suit: Suit.HEARTS,
  },
  {
    show: true,
    rank: {
      displayValue: 'Q',
      value: 12,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: '9',
      value: 9,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: '8',
      value: 8,
    },
    suit: Suit.HEARTS,
  },
  {
    show: true,
    rank: {
      displayValue: '4',
      value: 4,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: 'K',
      value: 13,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: 'K',
      value: 13,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: '10',
      value: 10,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: '7',
      value: 7,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: '2',
      value: 2,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: '3',
      value: 3,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: 'A',
      value: 14,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: 'J',
      value: 11,
    },
    suit: Suit.HEARTS,
  },
  {
    show: true,
    rank: {
      displayValue: 'A',
      value: 14,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: 'K',
      value: 13,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: 'Q',
      value: 12,
    },
    suit: Suit.HEARTS,
  },
  {
    show: true,
    rank: {
      displayValue: '3',
      value: 3,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: '2',
      value: 2,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: 'J',
      value: 11,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: '6',
      value: 6,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: '7',
      value: 7,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: 'K',
      value: 13,
    },
    suit: Suit.HEARTS,
  },
  {
    show: true,
    rank: {
      displayValue: 'A',
      value: 14,
    },
    suit: Suit.HEARTS,
  },
  {
    show: true,
    rank: {
      displayValue: '8',
      value: 8,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: 'J',
      value: 11,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: '10',
      value: 10,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: '6',
      value: 6,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: '10',
      value: 10,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: '8',
      value: 8,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: '4',
      value: 4,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: '9',
      value: 9,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: '6',
      value: 6,
    },
    suit: Suit.HEARTS,
  },
  {
    show: true,
    rank: {
      displayValue: '6',
      value: 6,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: 'J',
      value: 11,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: '5',
      value: 5,
    },
    suit: Suit.CLUBS,
  },
  {
    show: true,
    rank: {
      displayValue: '3',
      value: 3,
    },
    suit: Suit.HEARTS,
  },
  {
    show: true,
    rank: {
      displayValue: '3',
      value: 3,
    },
    suit: Suit.DIAMONDS,
  },
  {
    show: true,
    rank: {
      displayValue: '4',
      value: 4,
    },
    suit: Suit.SPADES,
  },
  {
    show: true,
    rank: {
      displayValue: '9',
      value: 9,
    },
    suit: Suit.HEARTS,
  },
  {
    show: true,
    rank: {
      displayValue: '7',
      value: 7,
    },
    suit: Suit.HEARTS,
  },
];

export const players: ScumPlayer[] = [
  {
    user: {
      id: '1',
      displayName: 'Aaron',
      avatar: 'https://i.pravatar.cc/300',
    },
    rank: 0,
    cards: deckOfCards.slice(0, 11).sort((a, b) => a.rank.value - b.rank.value),
    score: 0,
    pass: false,
    playedAtleastOneCardInSubRound: false,
  },
  {
    user: {
      id: '2',
      displayName: 'Bethany',
      avatar: 'https://i.pravatar.cc/300',
    },
    rank: 0,
    cards: deckOfCards
      .slice(11, 22)
      .sort((a, b) => a.rank.value - b.rank.value),
    score: 0,
    pass: false,
    playedAtleastOneCardInSubRound: false,
  },
  {
    user: {
      id: '3',
      displayName: 'Georgia',
      avatar: 'https://i.pravatar.cc/300',
    },
    rank: 0,
    cards: deckOfCards
      .slice(22, 32)
      .sort((a, b) => a.rank.value - b.rank.value),
    score: 0,
    pass: false,
    playedAtleastOneCardInSubRound: false,
  },
  {
    user: {
      id: '4',
      displayName: 'Hazel',
      avatar: 'https://i.pravatar.cc/300',
    },
    rank: 0,
    cards: deckOfCards
      .slice(32, 42)
      .sort((a, b) => a.rank.value - b.rank.value),
    score: 0,
    pass: false,
    playedAtleastOneCardInSubRound: false,
  },
  {
    user: {
      id: '5',
      displayName: 'Donovan',
      avatar: 'https://i.pravatar.cc/300',
    },
    rank: 0,
    cards: deckOfCards.slice(42).sort((a, b) => a.rank.value - b.rank.value),
    score: 0,
    pass: false,
    playedAtleastOneCardInSubRound: false,
  },
];

export const user: CardlyUser = {
  id: '1',
  displayName: 'Aaron',
  avatar: 'https://i.pravatar.cc/300',
};

export const gameWithoutGameState: Omit<ScumGame, 'state'> = {
  id: '8sd76f8ds6f',
  gameOwnerId: '1',
  subRoundWinnerId: '',
  roundWinnerId: '',
  presidentTraded: false,
  vicePresidentTraded: false,
  gameWinnerId: '',
  pointsToWin: 8,
  players: [...players],
  playersFinishedOrder: [],
  discardPile: [],
  lastPlayerToDiscardId: '',
  currentPlayerId: '',
  currentCardStackSize: 0,
};

export const stagedCards: Card[] = [
  {
    show: true,
    suit: Suit.DIAMONDS,
    rank: {
      displayValue: '6',
      value: 6,
    },
  },
  {
    show: true,
    suit: Suit.CLUBS,
    rank: {
      displayValue: '6',
      value: 6,
    },
  },
  {
    show: true,
    suit: Suit.HEARTS,
    rank: {
      displayValue: '6',
      value: 6,
    },
  },
];

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

export interface Rank {
  displayValue: string;
  value: number;
}

export interface Card {
  show: boolean;
  suit: Suit;
  rank: Rank;
}

export interface DeckOfCardsConfig {
  jokers: {
    include: boolean;
    numToInclude: number;
    value: number;
    displayValue: string;
  };
  acesHigh: boolean;
  numOfDecks: number;
}

const defaultDeckOfCardsConfig: DeckOfCardsConfig = {
  jokers: {
    include: false,
    numToInclude: 2,
    value: 0,
    displayValue: '',
  },
  acesHigh: true,
  numOfDecks: 1,
};
export class DeckOfCards {
  private suits: Suit[] = [Suit.CLUBS, Suit.DIAMONDS, Suit.HEARTS, Suit.SPADES];
  private ranks: Rank[] = [];

  private deck: Card[] = [];

  constructor(config?: Partial<DeckOfCardsConfig>) {
    this.initializeDeck({ ...defaultDeckOfCardsConfig, ...config });
  }

  private initializeDeck(config: DeckOfCardsConfig): void {
    this.ranks = [
      { displayValue: '2', value: 2 },
      { displayValue: '3', value: 3 },
      { displayValue: '4', value: 4 },
      { displayValue: '5', value: 5 },
      { displayValue: '6', value: 6 },
      { displayValue: '7', value: 7 },
      { displayValue: '8', value: 8 },
      { displayValue: '9', value: 9 },
      { displayValue: '10', value: 10 },
      { displayValue: 'J', value: 11 },
      { displayValue: 'Q', value: 12 },
      { displayValue: 'K', value: 13 },
      { displayValue: 'A', value: config.acesHigh ? 14 : 1 },
    ];

    this.suits.forEach((suit) =>
      this.ranks.forEach((rank) =>
        this.deck.push({ show: true, rank: rank, suit: suit }),
      ),
    );

    if (config.jokers.include) {
      for (let i = 0; i < config.jokers.numToInclude; i++) {
        this.deck.push({
          show: true,
          rank: {
            displayValue: config.jokers.displayValue,
            value: config.jokers.value,
          },
          suit: null,
        });
      }
    }

    // Create the number of decks specified in the config.
    this.deck = this.deck.concat(
      ...Array.from({ length: config.numOfDecks - 1 }, () => this.deck),
    );
  }

  //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let swap = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = swap;
    }
  }

  getCards(): Card[] {
    return this.deck;
  }
}

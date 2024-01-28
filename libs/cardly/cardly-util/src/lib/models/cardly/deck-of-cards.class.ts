import { shuffle } from '@playground/shared/util/array';
import { Card } from './card.interface';
import { Rank } from './rank.enum';
import { Suit } from './suit.enum';

export interface DeckOfCardsConfig {
  jokers: {
    include: boolean;
    numToInclude: number;
  };
  acesHigh: boolean;
  numOfDecks: number;
}

const defaultDeckOfCardsConfig: DeckOfCardsConfig = {
  jokers: {
    include: false,
    numToInclude: 2,
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
      Rank.TWO,
      Rank.THREE,
      Rank.FOUR,
      Rank.FIVE,
      Rank.SIX,
      Rank.SEVEN,
      Rank.EIGHT,
      Rank.NINE,
      Rank.TEN,
      Rank.JACK,
      Rank.QUEEN,
      Rank.KING,
      Rank.ACE,
    ];

    this.suits.forEach((suit) =>
      this.ranks.forEach((rank, rankIndex) => {
        let order: number;
        switch (rank) {
          case Rank.TWO:
            order = 2;
            break;
          case Rank.THREE:
            order = 3;
            break;
          case Rank.FOUR:
            order = 4;
            break;
          case Rank.FIVE:
            order = 5;
            break;
          case Rank.SIX:
            order = 6;
            break;
          case Rank.SEVEN:
            order = 7;
            break;
          case Rank.EIGHT:
            order = 8;
            break;
          case Rank.NINE:
            order = 9;
            break;
          case Rank.TEN:
            order = 10;
            break;
          case Rank.JACK:
            order = 11;
            break;
          case Rank.QUEEN:
            order = 12;
            break;
          case Rank.KING:
            order = 13;
            break;
          case Rank.ACE:
            order = config.acesHigh ? 14 : 1;
            break;
        }

        this.deck.push({
          rank: rank,
          suit: suit,
          order: order,
        });
      }),
    );

    if (config.jokers.include) {
      for (let i = 0; i < config.jokers.numToInclude; i++) {
        this.deck.push({
          rank: Rank.JOKER,
          suit: null,
          order: Math.max(...this.deck.filter((card) => card.rank !== Rank.JOKER).map((card) => card.order)) + 1,
        });
      }
    }

    // Create the number of decks specified in the config.
    this.deck = this.deck.concat(...Array.from({ length: config.numOfDecks - 1 }, () => this.deck));
  }

  //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(): void {
    shuffle(this.deck);
  }

  getCards(): Card[] {
    return this.deck;
  }
}

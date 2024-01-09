import { Card, CardlyUser, DeckOfCards } from './cardly';

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

export class ScumGamee {
  private players: ScumPlayer[] = [];
  private currentPlayerIndex: number = 0;

  constructor(users: CardlyUser[]) {
    this.initializeGame(users);
  }

  private initializeGame(users: CardlyUser[]): void {
    this.initializePlayers(users);
    this.setupPlayerHands();
  }

  private initializePlayers(users: CardlyUser[]): void {
    this.players = users.map((user) => ({
      user,
      rank: ScumRank.PEASANT,
      cards: [],
      score: 0,
      pass: false,
      playedAtleastOneCardInSubRound: false,
    }));

    // Shuffle players on the initial round.
    this.players.sort(() => Math.random() - 0.5);
  }

  private setupPlayerHands(): void {
    // Determine how many decks of cards are needed by dividing the number of players by 4. If there is a remainder, add 1 to the number of decks.
    const numberOfDecks = Math.ceil(this.players.length / 4);

    // Create a deck of cards for each deck needed.
    const deck = new DeckOfCards({ numOfDecks: numberOfDecks });
    deck.shuffle();
    const cards = deck.getCards();

    // Deal cards to each player.
    let iterator = 0;
    while (cards.length > 0) {
      this.players[iterator].cards.push(cards.pop());
      iterator++;
      if (iterator >= this.players.length) {
        iterator = 0;
      }
    }

    // Sort players hands by card value.
    this.players.forEach((player) => {
      player.cards.sort((a, b) => a.rank.value - b.rank.value);
    });
  }
}

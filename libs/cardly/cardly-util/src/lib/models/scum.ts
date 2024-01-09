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

export class ScumGamee {
  private players: string[] = [];
  private currentPlayerIndex: number = 0;
  private deck: string[] = [];
  private hands: { [player: string]: string[] } = {};
  private president: string | null = null;
  private vicePresident: string | null = null;
  private scum: string | null = null;
  private viceScum: string | null = null;

  constructor(players: string[]) {
    this.players = players;
    this.initializeGame();
  }

  private initializeGame(): void {
    this.deck = this.generateDeck();
    // this.shuffleDeck();
    // this.dealCards();
    // this.assignInitialRanks();
  }

  private generateDeck(): string[] {
    // Generate a standard 52-card deck (you might want to consider Jokers if your variation includes them)
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A',
    ];
    return [];
    // return suits.flatMap((suit) => ranks.map((rank) => `${rank} of ${suit}`));
  }
}

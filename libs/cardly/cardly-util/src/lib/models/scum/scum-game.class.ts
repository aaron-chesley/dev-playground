import { Card, CardlyUser, DeckOfCards, sortCardsByOrder } from '../cardly';
import { ScumGamePhase } from './scum-game-phase.enum';
import { ScumHand } from './scum-hand.interface';
import { ScumTrick } from './scum-trick.interface';
import { ScumTrickWinner } from './scum-game-ui.interface';
import { randomGameId, randomId } from '@playground/shared/util/id';

export class ScumGame {
  private readonly _gameId: string;
  private readonly MIN_PLAYERS_TO_START = 4;
  private readonly PLAYERS_PER_DECK = 5;
  private _gameOwnerUserId: string;
  private _users: CardlyUser[] = [];
  private _trick: ScumTrick;
  private _hands: { [userId: string]: ScumHand } = {};
  private _phase: ScumGamePhase;
  private _presidentTraded: boolean = false;
  private _vicePresidentTraded: boolean = false;
  private _trickWinner: ScumTrickWinner;

  constructor() {
    this._gameId = randomGameId();
    this._phase = ScumGamePhase.PREGAME;
  }

  public get gameId(): string {
    return this._gameId;
  }

  public get gameOwnerUserId(): string {
    return this._gameOwnerUserId;
  }

  public get users(): CardlyUser[] {
    return this._users;
  }

  public get trick(): ScumTrick {
    return this._trick;
  }

  public get hands(): { [userId: string]: ScumHand } {
    return this._hands;
  }

  public get phase(): ScumGamePhase {
    return this._phase;
  }

  public get presidentTraded(): boolean {
    return this._presidentTraded;
  }

  public get vicePresidentTraded(): boolean {
    return this._vicePresidentTraded;
  }

  public get trickWinner(): ScumTrickWinner {
    return this._trickWinner;
  }

  public addUserToGame(user: CardlyUser): void {
    if (this._phase !== ScumGamePhase.PREGAME) {
      console.error('Cannot add user to game that has already started.');
      return;
    }

    if (this._users.some((u) => u.id === user.id)) {
      console.error('Cannot add user to game that is already in the game.');
      return;
    }

    if (!this._gameOwnerUserId) {
      this._gameOwnerUserId = user.id;
    }

    this._users.push(user);
  }

  public removeUserFromGame(userId: string): void {
    if (this._gameOwnerUserId === userId) {
      this._gameOwnerUserId = this._users.find((user) => user.id !== userId)?.id;
    }

    this._users = this._users.filter((user) => user.id !== userId);

    if (this._users.length < this.MIN_PLAYERS_TO_START) {
      this._phase = ScumGamePhase.PREGAME;
      delete this._hands[userId];
      this.trick.removePlayer(userId);
      this.trick.resetTrick();
    }

    if (this._users.length >= this.MIN_PLAYERS_TO_START) {
      if (this._trick.currentUserTurnId === userId) {
        this.assignNextPlayerTurn();
      }
    }
  }

  public startGame(): void {
    if (this._phase !== ScumGamePhase.PREGAME) {
      console.error('Cannot start game that has already started.');
      return;
    }

    if (this._users.length < this.MIN_PLAYERS_TO_START) {
      console.error(`Cannot start game with less than ${this.MIN_PLAYERS_TO_START} players.`);
      return;
    }

    this._trick = new ScumTrick(this._users);
    this.setupNewRound({ isFirstRound: true });
    this._phase = ScumGamePhase.IN_PROGRESS;
  }

  public playCards(payload: { userId: string; cardsInPlay: Card[] }): void {
    let { userId, cardsInPlay } = payload;
    let { currentUserTurnId } = this._trick;

    if (this._phase !== ScumGamePhase.IN_PROGRESS) {
      console.error('Cannot play turn on game that is not in progress');
      return;
    }
    if (currentUserTurnId !== userId) {
      console.error('Cannot play turn when it is not your turn.');
      return;
    }
    if (!this._trick.isValidDiscard(cardsInPlay, this._hands[userId])) {
      return;
    }
    // Remove cards from players hand.
    this.removeCardsFromPlayersHand(cardsInPlay, this._hands[userId].cards);
    // Add cards to discard pile.
    this._trick.addCardsToDiscardPile(cardsInPlay, userId);
    // Check if player is finished for current round. If so, push to user finish order.
    if (this.isHandFinished(this._hands[userId])) {
      this._hands[userId].finishOrder = Math.max(...Object.values(this._hands).map((hand) => hand.finishOrder)) + 1;
    }

    // Calculate new game state.
    this.calculateNewGameState();
  }

  public passTurn(userId: string): void {
    if (this._phase !== ScumGamePhase.IN_PROGRESS) {
      console.error('Cannot pass turn on game that is not in progress');
      return;
    }
    if (this._trick.currentUserTurnId !== userId) {
      console.error('Cannot pass turn when it is not your turn.');
      return;
    }
    if (this._trick.requiredDiscardSize === 0) {
      console.error('Cannot pass turn when no cards have been played.');
      return;
    }

    this._trick.players[userId].passed = true;
    this._trick.players[userId].hadAleastOneTurn = true;

    // Calculate new game state.
    this.calculateNewGameState();
  }

  public startNewRound(): void {
    if (this._phase !== ScumGamePhase.POSTGAME) {
      console.error('Cannot start new round on game that is not in postgame.');
      return;
    }

    // Reset sub round.
    this._trick.setupNextTrick(this._hands);

    // Reset round.
    this.setupNewRound({ isFirstRound: false });

    // Set game _phase to in progress.
    this._phase = ScumGamePhase.CARD_SWAP;
  }

  public swapCards(payload: { userId: string; cards: Card[] }): void {
    if (this._phase !== ScumGamePhase.CARD_SWAP) {
      console.error('Cannot swap cards on game that is not in card swap.');
      return;
    }

    if (this._hands[payload.userId].turnOrder === 1) {
      if (this._presidentTraded) {
        console.error('President has already traded cards.');
        return;
      }
      // This user is the President. They should have 2 cards to give to Scum and Scum should automatically give their 2 highest ranked cards to the President.
      if (payload.cards.length !== 2) {
        console.error('President must swap 2 cards with Scum.');
        return;
      }

      // Remove cards from President's hand.
      this.removeCardsFromPlayersHand(payload.cards, this._hands[payload.userId].cards);

      // Add cards to Scum's hand.
      const scumHand = Object.values(this._hands).find((hand) => hand.turnOrder === this._users.length);
      scumHand.cards.push(...payload.cards);

      // Sort Scum's hand.
      scumHand.cards.sort(sortCardsByOrder);

      // Add Scum's highest ranked cards to President's hand.
      const presidentHand = this._hands[payload.userId].cards;
      const scumHighestRankedCards = scumHand.cards.slice(scumHand.cards.length - 2);
      presidentHand.push(...scumHighestRankedCards);
      this.removeCardsFromPlayersHand(scumHighestRankedCards, scumHand.cards);

      // Sort President's hand.
      presidentHand.sort(sortCardsByOrder);

      // Sort Scum's hand.
      scumHand.cards.sort(sortCardsByOrder);

      // Set President traded to true.
      this._presidentTraded = true;
    } else if (this._hands[payload.userId].turnOrder === 2) {
      if (this._vicePresidentTraded) {
        console.error('Vice President has already traded cards.');
        return;
      }
      // This user is the Vice President. They should have 1 card to give to Vice Scum and Vice Scum should automatically give their 1 highest ranked card to the Vice President.
      if (payload.cards.length !== 1) {
        console.error('Vice President must swap 1 card with Vice Scum.');
        return;
      }

      // Remove cards from Vice President's hand.
      this.removeCardsFromPlayersHand(payload.cards, this._hands[payload.userId].cards);

      // Add cards to Vice Scum's hand.
      const viceScumHand = Object.values(this._hands).find((hand) => hand.turnOrder === this._users.length - 1);
      viceScumHand.cards.push(...payload.cards);

      // Sort Vice Scum's hand.
      viceScumHand.cards.sort(sortCardsByOrder);

      // Add Vice Scum's highest ranked card to Vice President's hand.
      const vicePresidentHand = this._hands[payload.userId].cards;
      const viceScumHighestRankedCard = viceScumHand.cards[viceScumHand.cards.length - 1];
      vicePresidentHand.push(viceScumHighestRankedCard);
      this.removeCardsFromPlayersHand([viceScumHighestRankedCard], viceScumHand.cards);

      // Sort Vice President's hand.
      vicePresidentHand.sort(sortCardsByOrder);

      // Sort Vice Scum's hand.
      viceScumHand.cards.sort(sortCardsByOrder);

      // Set Vice President traded to true.
      this._vicePresidentTraded = true;
    }

    if (this._presidentTraded && this._vicePresidentTraded) {
      this._presidentTraded = false;
      this._vicePresidentTraded = false;
      // Set game _phase to in progress.
      this._phase = ScumGamePhase.IN_PROGRESS;
    }
  }

  public getUsers(): CardlyUser[] {
    return this._users;
  }

  private calculateNewGameState(): void {
    // Check if the round is finished.
    if (this.isRoundFinished()) {
      this.setTrickWinner();
      // Find the player who is not finished and push their id to the finish order.
      Object.values(this._hands).find((hand) => hand.cards.length > 0).finishOrder = this._users.length;
      this._trick.discardPile = [];
      this._phase = ScumGamePhase.POSTGAME;
      return;
    }

    // If the last card played was an ace, the sub round is finished.
    if (this._trick.wasAceLastCardPlayed()) {
      this.setTrickWinner();
      this._trick.resetTrick();
      // If the player who played the ace still has cards in their hand, they are the next player.
      if (this._hands[this._trick.currentUserTurnId].cards.length) {
        // Do nothing.
      } else {
        // Otherwise, the next player is the next player in the turn order.
        this.assignNextPlayerTurn();
      }

      return;
    }

    const playersStillPlayingTrick = this.getPlayersStillPlayingTrick();

    // If there are no players left playing in the sub round, the sub round is finished.
    if (playersStillPlayingTrick.length === 0) {
      this.setTrickWinner();
      this._trick.resetTrick();
      this.assignNextPlayerTurn();
      return;
    }

    // If there's only one player left playing in the sub round and everyone remaining has had at least one turn, they are the winner and the sub round is finished.
    if (playersStillPlayingTrick.length === 1 && this.everyRemainingPlayerHasHadAtLeastOneTurn()) {
      this.setTrickWinner();
      this._trick.resetTrick();

      // The player who is still playing is the next player.
      this._trick.currentUserTurnId = playersStillPlayingTrick[0].id;

      return;
    }

    this.assignNextPlayerTurn();
  }

  private getPlayersStillPlayingTrick(): CardlyUser[] {
    return this._users.filter((user) => {
      const { players } = this._trick;
      return this._hands[user.id].cards.length && !players[user.id].passed;
    });
  }

  private isRoundFinished(): boolean {
    // Round is finished when all but one player has finished by playing all of their cards.
    const numPlayersFinished = Object.values(this._hands).reduce((acc, hand) => {
      return hand.cards.length === 0 ? acc + 1 : acc;
    }, 0);
    return numPlayersFinished === this._users.length - 1;
  }

  private everyRemainingPlayerHasHadAtLeastOneTurn(): boolean {
    return this.getPlayersStillPlayingTrick().every((player) => {
      return this._trick.players[player.id].hadAleastOneTurn;
    });
  }

  private isHandFinished(hand: ScumHand): boolean {
    return hand.cards.length === 0;
  }

  private assignNextPlayerTurn(): void {
    let { currentUserTurnId, players } = this._trick;
    const numUsers = this._users.length;

    let nextPlayerFound = false;
    let iterations = 0;
    let currentTurnOrder = Object.values(this._hands).find((hand) => hand.userId === currentUserTurnId).turnOrder;
    while (!nextPlayerFound && iterations < numUsers) {
      iterations++;
      const nextTurnOrder = currentTurnOrder === numUsers ? 1 : currentTurnOrder + 1;
      const nextHand = Object.values(this._hands).find((hand) => hand.turnOrder === nextTurnOrder);
      if (nextHand.cards.length && !players[nextHand.userId].passed) {
        this._trick.currentUserTurnId = nextHand.userId;
        nextPlayerFound = true;
      } else {
        currentTurnOrder = nextTurnOrder;
      }
    }

    if (!nextPlayerFound) {
      console.error('Could not find next player.');
    }
  }

  private removeCardsFromPlayersHand(cards: Card[], playersHand: Card[]): void {
    cards.forEach((card) => {
      const index = playersHand.findIndex((c) => c.rank === card.rank && c.suit === card.suit);
      playersHand.splice(index, 1);
    });
  }

  private setupNewRound(payload: { isFirstRound: boolean }): void {
    this._trickWinner = undefined;
    if (payload.isFirstRound) {
      this._users.forEach((user, index) => {
        this._hands[user.id] = {
          userId: user.id,
          cards: [],
          turnOrder: index + 1,
          finishOrder: 0,
        };
      });
    } else {
      this._users.forEach((user) => {
        this._hands[user.id] = {
          userId: user.id,
          cards: [],
          turnOrder: this._hands[user.id].finishOrder,
          finishOrder: 0,
        };
      });
    }

    // Determine how many decks of cards are needed by dividing the number of players by PLAYERS_PER_DECK. If there is a remainder, add 1 to the number of decks.
    const numberOfDecks = Math.ceil(this._users.length / this.PLAYERS_PER_DECK);

    // Create a deck of cards for each deck needed.
    const deck = new DeckOfCards({ numOfDecks: numberOfDecks });
    deck.shuffle();
    const cards = deck.getCards();

    // Deal cards to each hand.
    while (cards.length > 0) {
      // Push a card to each hand until there are no more cards.
      for (const userId in this._hands) {
        // If there are no more cards, break out of the loop.
        if (cards.length === 0) {
          break;
        }
        // Push a card to the hand.
        this._hands[userId].cards.push(cards.pop());
      }
    }

    // Sort players _hands by card value.
    for (const hand in this._hands) {
      this._hands[hand].cards.sort(sortCardsByOrder);
    }

    if (payload.isFirstRound) {
      // Randomly assign a user id to be the current turn
      const randomIndex = Math.floor(Math.random() * this._users.length);
      this._trick.currentUserTurnId = this._users[randomIndex].id;
    }
  }

  private setTrickWinner() {
    const winningDiscard = this._trick.discardPile[this._trick.discardPile.length - 1];
    this._trickWinner = {
      id: randomId(),
      name: this._users.find((user) => user.id === winningDiscard.userId).displayName,
      cards: winningDiscard.cards,
    };
  }
}

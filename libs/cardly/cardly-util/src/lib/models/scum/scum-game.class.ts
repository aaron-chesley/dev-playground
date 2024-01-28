import { Card, CardlyUser, DeckOfCards, sortCardsByOrder } from '../cardly';
import { ScumGamePhase } from './scum-game-phase.enum';
import { ScumHand } from './scum-hand.interface';
import { ScumTrick } from './scum-trick.interface';
import { ScumGameUI } from './scum-game-ui.interface';
import { randomId } from '@playground/shared/util/id';

export class ScumGame {
  public readonly gameId: string;
  private readonly MIN_PLAYERS_TO_START = 4;
  private readonly PLAYERS_PER_DECK = 5;
  private gameOwnerUserId: string;
  private users: CardlyUser[] = [];
  private trick: ScumTrick;
  private hands: { [userId: string]: ScumHand } = {};
  private phase: ScumGamePhase;
  private presidentTraded: boolean = false;
  private vicePresidentTraded: boolean = false;

  constructor(user: CardlyUser) {
    this.gameId = randomId();
    this.gameOwnerUserId = user.id;
    this.phase = ScumGamePhase.PREGAME;
    this.addUserToGame(user);
  }

  public addUserToGame(user: CardlyUser): void {
    if (this.phase !== ScumGamePhase.PREGAME) {
      console.error('Cannot add user to game that has already started.');
      return;
    }

    if (this.users.some((u) => u.id === user.id)) {
      console.error('Cannot add user to game that is already in the game.');
      return;
    }

    this.users.push(user);
  }

  public startGame(): void {
    if (this.phase !== ScumGamePhase.PREGAME) {
      console.error('Cannot start game that has already started.');
      return;
    }

    if (this.users.length < this.MIN_PLAYERS_TO_START) {
      console.error(`Cannot start game with less than ${this.MIN_PLAYERS_TO_START} players.`);
      return;
    }

    this.trick = new ScumTrick(this.users);
    this.setupNewRound({ isFirstRound: true });
    this.phase = ScumGamePhase.IN_PROGRESS;
  }

  public playCards(payload: { userId: string; cardsInPlay: Card[] }): void {
    let { userId, cardsInPlay } = payload;
    let { currentUserTurnId } = this.trick;

    if (this.phase !== ScumGamePhase.IN_PROGRESS) {
      console.error('Cannot play turn on game that is not in progress');
      return;
    }
    if (currentUserTurnId !== userId) {
      console.error('Cannot play turn when it is not your turn.');
      return;
    }
    if (!this.trick.isValidDiscard(cardsInPlay, this.hands[userId])) {
      return;
    }
    // Remove cards from players hand.
    this.removeCardsFromPlayersHand(cardsInPlay, this.hands[userId].cards);
    // Add cards to discard pile.
    this.trick.addCardsToDiscardPile(cardsInPlay, userId);
    // Check if player is finished for current round. If so, push to user finish order.
    if (this.isHandFinished(this.hands[userId])) {
      this.hands[userId].finishOrder = Math.max(...Object.values(this.hands).map((hand) => hand.finishOrder)) + 1;
    }

    // Calculate new game state.
    this.calculateNewGameState();
  }

  public passTurn(userId: string): void {
    if (this.phase !== ScumGamePhase.IN_PROGRESS) {
      console.error('Cannot pass turn on game that is not in progress');
      return;
    }
    if (this.trick.currentUserTurnId !== userId) {
      console.error('Cannot pass turn when it is not your turn.');
      return;
    }
    if (this.trick.requiredDiscardSize === 0) {
      console.error('Cannot pass turn when no cards have been played.');
      return;
    }

    this.trick.players[userId].passed = true;
    this.trick.players[userId].hadAleastOneTurn = true;

    // Calculate new game state.
    this.calculateNewGameState();
  }

  public startNewRound(): void {
    if (this.phase !== ScumGamePhase.POSTGAME) {
      console.error('Cannot start new round on game that is not in postgame.');
      return;
    }

    // Reset sub round.
    this.trick.setupNextTrick(this.hands);

    // Reset round.
    this.setupNewRound({ isFirstRound: false });

    // Set game phase to in progress.
    this.phase = ScumGamePhase.CARD_SWAP;
  }

  public swapCards(payload: { userId: string; cards: Card[] }): void {
    if (this.phase !== ScumGamePhase.CARD_SWAP) {
      console.error('Cannot swap cards on game that is not in card swap.');
      return;
    }

    if (this.hands[payload.userId].turnOrder === 1) {
      if (this.presidentTraded) {
        console.error('President has already traded cards.');
        return;
      }
      // This user is the President. They should have 2 cards to give to Scum and Scum should automatically give their 2 highest ranked cards to the President.
      if (payload.cards.length !== 2) {
        console.error('President must swap 2 cards with Scum.');
        return;
      }

      // Remove cards from President's hand.
      this.removeCardsFromPlayersHand(payload.cards, this.hands[payload.userId].cards);

      // Add cards to Scum's hand.
      const scumHand = Object.values(this.hands).find((hand) => hand.turnOrder === this.users.length);
      scumHand.cards.push(...payload.cards);

      // Sort Scum's hand.
      scumHand.cards.sort(sortCardsByOrder);

      // Add Scum's highest ranked cards to President's hand.
      const presidentHand = this.hands[payload.userId].cards;
      const scumHighestRankedCards = scumHand.cards.slice(scumHand.cards.length - 2);
      presidentHand.push(...scumHighestRankedCards);
      this.removeCardsFromPlayersHand(scumHighestRankedCards, scumHand.cards);

      // Sort President's hand.
      presidentHand.sort(sortCardsByOrder);

      // Sort Scum's hand.
      scumHand.cards.sort(sortCardsByOrder);

      // Set President traded to true.
      this.presidentTraded = true;
    } else if (this.hands[payload.userId].turnOrder === 2) {
      if (this.vicePresidentTraded) {
        console.error('Vice President has already traded cards.');
        return;
      }
      // This user is the Vice President. They should have 1 card to give to Vice Scum and Vice Scum should automatically give their 1 highest ranked card to the Vice President.
      if (payload.cards.length !== 1) {
        console.error('Vice President must swap 1 card with Vice Scum.');
        return;
      }

      // Remove cards from Vice President's hand.
      this.removeCardsFromPlayersHand(payload.cards, this.hands[payload.userId].cards);

      // Add cards to Vice Scum's hand.
      const viceScumHand = Object.values(this.hands).find((hand) => hand.turnOrder === this.users.length - 1);
      viceScumHand.cards.push(...payload.cards);

      // Sort Vice Scum's hand.
      viceScumHand.cards.sort(sortCardsByOrder);

      // Add Vice Scum's highest ranked card to Vice President's hand.
      const vicePresidentHand = this.hands[payload.userId].cards;
      const viceScumHighestRankedCard = viceScumHand.cards[viceScumHand.cards.length - 1];
      vicePresidentHand.push(viceScumHighestRankedCard);
      this.removeCardsFromPlayersHand([viceScumHighestRankedCard], viceScumHand.cards);

      // Sort Vice President's hand.
      vicePresidentHand.sort(sortCardsByOrder);

      // Sort Vice Scum's hand.
      viceScumHand.cards.sort(sortCardsByOrder);

      // Set Vice President traded to true.
      this.vicePresidentTraded = true;
    }

    if (this.presidentTraded && this.vicePresidentTraded) {
      this.presidentTraded = false;
      this.vicePresidentTraded = false;
      // Set game phase to in progress.
      this.phase = ScumGamePhase.IN_PROGRESS;
    }
  }

  public getUsers(): CardlyUser[] {
    return this.users;
  }

  private calculateNewGameState(): void {
    // Check if the round is finished.
    if (this.isRoundFinished()) {
      // Find the player who is not finished and push their id to the finish order.
      Object.values(this.hands).find((hand) => hand.cards.length > 0).finishOrder = this.users.length;
      this.phase = ScumGamePhase.POSTGAME;
      return;
    }

    // If the last card played was an ace, the sub round is finished.
    if (this.trick.wasAceLastCardPlayed()) {
      this.trick.resetTrick();
      // If the player who played the ace still has cards in their hand, they are the next player.
      if (this.hands[this.trick.currentUserTurnId].cards.length) {
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
      this.trick.resetTrick();
      this.assignNextPlayerTurn();
      return;
    }

    // If there's only one player left playing in the sub round and everyone remaining has had at least one turn, they are the winner and the sub round is finished.
    if (playersStillPlayingTrick.length === 1 && this.everyRemainingPlayerHasHadAtLeastOneTurn()) {
      this.trick.resetTrick();

      // The player who is still playing is the next player.
      this.trick.currentUserTurnId = playersStillPlayingTrick[0].id;

      return;
    }

    this.assignNextPlayerTurn();
  }

  private getPlayersStillPlayingTrick(): CardlyUser[] {
    return this.users.filter((user) => {
      const { players } = this.trick;
      return this.hands[user.id].cards.length && !players[user.id].passed;
    });
  }

  private isRoundFinished(): boolean {
    // Round is finished when all but one player has finished by playing all of their cards.
    const numPlayersFinished = Object.values(this.hands).reduce((acc, hand) => {
      return hand.cards.length === 0 ? acc + 1 : acc;
    }, 0);
    return numPlayersFinished === this.users.length - 1;
  }

  private everyRemainingPlayerHasHadAtLeastOneTurn(): boolean {
    return this.getPlayersStillPlayingTrick().every((player) => {
      return this.trick.players[player.id].hadAleastOneTurn;
    });
  }

  private isHandFinished(hand: ScumHand): boolean {
    return hand.cards.length === 0;
  }

  private assignNextPlayerTurn(): void {
    let { currentUserTurnId, players } = this.trick;
    const numUsers = this.users.length;

    let nextPlayerFound = false;
    let iterations = 0;
    let currentTurnOrder = Object.values(this.hands).find((hand) => hand.userId === currentUserTurnId).turnOrder;
    while (!nextPlayerFound && iterations < numUsers) {
      iterations++;
      const nextTurnOrder = currentTurnOrder === numUsers ? 1 : currentTurnOrder + 1;
      const nextHand = Object.values(this.hands).find((hand) => hand.turnOrder === nextTurnOrder);
      if (nextHand.cards.length && !players[nextHand.userId].passed) {
        this.trick.currentUserTurnId = nextHand.userId;
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

  private areCardsBeingPlayedInPlayersHand(cardsBeingPlayed: Card[], playersHand: Card[]): boolean {
    // Need to refactor this to ensure that there is a 1:1 match of cards being played to cards in hand.
    return cardsBeingPlayed.every((cardBeingPlayed) => {
      return playersHand.some((cardInHand) => {
        return cardBeingPlayed.rank === cardInHand.rank && cardBeingPlayed.suit === cardInHand.suit;
      });
    });
  }

  private setupNewRound(payload: { isFirstRound: boolean }): void {
    if (payload.isFirstRound) {
      this.users.forEach((user, index) => {
        this.hands[user.id] = {
          userId: user.id,
          cards: [],
          turnOrder: index + 1,
          finishOrder: 0,
        };
      });
    } else {
      this.users.forEach((user) => {
        this.hands[user.id] = {
          userId: user.id,
          cards: [],
          turnOrder: this.hands[user.id].finishOrder,
          finishOrder: 0,
        };
      });
    }

    // Determine how many decks of cards are needed by dividing the number of players by PLAYERS_PER_DECK. If there is a remainder, add 1 to the number of decks.
    const numberOfDecks = Math.ceil(this.users.length / this.PLAYERS_PER_DECK);

    // Create a deck of cards for each deck needed.
    const deck = new DeckOfCards({ numOfDecks: numberOfDecks });
    deck.shuffle();
    const cards = deck.getCards();

    // Deal cards to each hand.
    while (cards.length > 0) {
      // Push a card to each hand until there are no more cards.
      for (const userId in this.hands) {
        // If there are no more cards, break out of the loop.
        if (cards.length === 0) {
          break;
        }
        // Push a card to the hand.
        this.hands[userId].cards.push(cards.pop());
      }
    }

    // Sort players hands by card value.
    for (const hand in this.hands) {
      this.hands[hand].cards.sort(sortCardsByOrder);
    }

    if (payload.isFirstRound) {
      // Randomly assign a user id to be the current turn
      const randomIndex = Math.floor(Math.random() * this.users.length);
      this.trick.currentUserTurnId = this.users[randomIndex].id;
    }
  }

  public getCurrentGameState(userId: string): ScumGameUI {
    return {
      gameId: this.gameId,
      gameOwnerUserId: this.gameOwnerUserId,
      hand: this.hands[userId]?.cards || [],
      discardPile: this.trick?.discardPile || [],
      requiredDiscardSize: this.trick?.requiredDiscardSize || undefined,
      currentDiscardNumericalRank: this.trick?.currentDiscardOrder || undefined,
      phase: this.phase,
      currentUserTurnId: this.trick?.currentUserTurnId || '',
      presidentTraded: this.presidentTraded,
      vicePresidentTraded: this.vicePresidentTraded,
      players: this.users.reduce((acc: any, user) => {
        acc[user.id] = {
          ...user,
          numOfCards: this.hands[user.id]?.cards.length || 0,
          passed: this.trick?.players[user.id]?.passed || false,
          finishOrder: this.hands[user.id]?.finishOrder || 0,
          turnOrder: this.hands[user.id]?.turnOrder || 0,
        };
        return acc;
      }, {}),
    };
  }
}

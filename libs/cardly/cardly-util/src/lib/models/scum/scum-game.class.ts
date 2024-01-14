import { haveSameProperty } from '@playground/shared/util/array';
import { Card, CardlyUser, DeckOfCards, Rank, sortCardsByOrder } from '../cardly';
import { ScumGamePhase } from './scum-game-phase.enum';
import { ScumHand } from './scum-hand.interface';
import { ScumSubRound, getScumSubRound } from './scum-sub-round.interface';
import { ScumRound, getScumRound } from './scum-round.interface';
import { ScumGameState } from './scum-game-state.interface';

export class ScumGame {
  private readonly MIN_PLAYERS_TO_START = 4;
  private readonly PLAYERS_PER_DECK = 5;
  private gameOwnerUserId: string;
  private users: CardlyUser[] = [];
  private subRound: ScumSubRound = getScumSubRound();
  private round: ScumRound = getScumRound();
  private phase: ScumGamePhase;
  private presidentTraded: boolean = false;
  private vicePresidentTraded: boolean = false;

  constructor() {
    this.phase = ScumGamePhase.PREGAME;
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

    this.gameOwnerUserId = this.users[0].id;
    this.setupNewSubRound();
    this.setupNewRound();
    this.phase = ScumGamePhase.IN_PROGRESS;
  }

  public playCards(payload: { userId: string; cardsInPlay: Card[] }): void {
    let { userId, cardsInPlay } = payload;
    let { currentUserTurnId, numOfCardsRequiredToPlay } = this.subRound;
    let { hands } = this.round;

    if (this.phase !== ScumGamePhase.IN_PROGRESS) {
      console.error('Cannot play turn on game that is not in progress');
      return;
    }
    if (currentUserTurnId !== userId) {
      console.error('Cannot play turn when it is not your turn.');
      return;
    }
    if (cardsInPlay.length === 0) {
      console.error('Cannot play turn without playing any cards.');
      return;
    }
    if (cardsInPlay.length !== numOfCardsRequiredToPlay && numOfCardsRequiredToPlay !== 0) {
      console.error('Cannot play turn without playing the correct number of cards.');
      return;
    }
    if (!haveSameProperty(cardsInPlay, 'rank')) {
      console.error('Cannot play turn without playing cards of the same rank.');
      return;
    }
    if (!this.areCardsBeingPlayedInPlayersHand(cardsInPlay, hands[userId].cards)) {
      console.error('Cannot play turn without playing cards that are in your hand.');
      return;
    }
    // Remove cards from players hand.
    this.removeCardsFromPlayersHand(cardsInPlay, hands[userId].cards);
    // Add cards to discard pile.
    this.subRound.discardPile.push(...cardsInPlay);
    // Update number of cards required to play.
    this.subRound.numOfCardsRequiredToPlay = cardsInPlay.length;
    // Update player played at least one card.
    this.subRound.players[userId].hadAleastOneTurn = true;
    // Check if player is finished for current round. If so, push to user finish order.
    if (this.isHandFinished(hands[userId])) {
      this.round.finishOrderIds.push(userId);
    }

    // Calculate new game state.
    this.calculateNewGameState();
  }

  public passTurn(userId: string): void {
    if (this.phase !== ScumGamePhase.IN_PROGRESS) {
      console.error('Cannot pass turn on game that is not in progress');
      return;
    }
    if (this.subRound.currentUserTurnId !== userId) {
      console.error('Cannot pass turn when it is not your turn.');
      return;
    }
    if (this.subRound.numOfCardsRequiredToPlay === 0) {
      console.error('Cannot pass turn when no cards have been played.');
      return;
    }

    this.subRound.players[userId].passed = true;
    this.subRound.players[userId].hadAleastOneTurn = true;

    // Calculate new game state.
    this.calculateNewGameState();
  }

  private calculateNewGameState(): void {
    // Check if the round is finished.
    if (this.isRoundFinished()) {
      this.resetDiscardPile();
      this.resetNumberOfCardsRequiredToPlayTurn();
      this.setAllPlayersToNotPassed();
      this.setAllPlayersToHaveNotHadAtLeastOneTurn();
      this.phase = ScumGamePhase.POSTGAME;
      return;
    }

    // If the last card played was an ace, the sub round is finished.
    if (this.wasAceLastCardPlayed()) {
      this.resetDiscardPile();
      this.resetNumberOfCardsRequiredToPlayTurn();
      this.setAllPlayersToNotPassed();
      this.setAllPlayersToHaveNotHadAtLeastOneTurn();
      // If the player who played the ace still has cards in their hand, they are the next player.
      if (this.round.hands[this.subRound.currentUserTurnId].cards.length) {
        // Do nothing.
      } else {
        // Otherwise, the next player is the next player in the turn order.
        this.assignNextPlayerTurn();
      }

      return;
    }

    const playersStillPlayingSubRound = this.getPlayersStillPlayingSubRound();

    // If there are no players left playing in the sub round, the sub round is finished.
    if (playersStillPlayingSubRound.length === 0) {
      this.resetDiscardPile();
      this.resetNumberOfCardsRequiredToPlayTurn();
      this.setAllPlayersToNotPassed();
      this.setAllPlayersToHaveNotHadAtLeastOneTurn();
      this.assignNextPlayerTurn();
      return;
    }

    // If there's only one player left playing in the sub round and everyone remaining has had at least one turn, they are the winner and the sub round is finished.
    if (playersStillPlayingSubRound.length === 1 && this.everyRemainingPlayerHasHadAtLeastOneTurn()) {
      this.resetDiscardPile();
      this.resetNumberOfCardsRequiredToPlayTurn();
      this.setAllPlayersToNotPassed();
      this.setAllPlayersToHaveNotHadAtLeastOneTurn();

      // The player who is still playing is the next player.
      this.subRound.currentUserTurnId = playersStillPlayingSubRound[0].id;

      return;
    }

    this.assignNextPlayerTurn();
  }

  private setAllPlayersToHaveNotHadAtLeastOneTurn(): void {
    for (const player in this.subRound.players) {
      this.subRound.players[player].hadAleastOneTurn = false;
    }
  }

  private getPlayersStillPlayingSubRound(): CardlyUser[] {
    return this.users.filter((user) => {
      const { hands } = this.round;
      const { players } = this.subRound;
      return hands[user.id].cards.length && !players[user.id].passed;
    });
  }

  private isRoundFinished(): boolean {
    // Round is finished when all but one player has finished by playing all of their cards.
    return this.round.finishOrderIds.length === this.users.length - 1;
  }

  private everyRemainingPlayerHasHadAtLeastOneTurn(): boolean {
    return this.getPlayersStillPlayingSubRound().every((player) => {
      return this.subRound.players[player.id].hadAleastOneTurn;
    });
  }

  private isHandFinished(hand: ScumHand): boolean {
    return hand.cards.length === 0;
  }

  private setAllPlayersToNotPassed(): void {
    for (const player in this.subRound.players) {
      this.subRound.players[player].passed = false;
    }
  }

  private resetNumberOfCardsRequiredToPlayTurn(): void {
    this.subRound.numOfCardsRequiredToPlay = 0;
  }

  private resetDiscardPile(): void {
    this.subRound.discardPile = [];
  }

  private wasAceLastCardPlayed(): boolean {
    const { discardPile } = this.subRound;
    const discardPileLength = discardPile.length;
    return discardPileLength && discardPile[discardPileLength - 1].rank === Rank.ACE;
  }

  private assignNextPlayerTurn(): void {
    let { currentUserTurnId, players } = this.subRound;
    const { hands } = this.round;
    const currentUserTurnIndex = this.users.findIndex((user) => user.id === currentUserTurnId);
    const numUsers = this.users.length;
    for (let i = 1; i <= numUsers; i++) {
      const nextUserIdx = (currentUserTurnIndex + i) % numUsers;
      const nextUserId = this.users[nextUserIdx].id;
      const nextPlayer = players[nextUserId];
      if (!nextPlayer.passed && hands[nextUserId].cards.length > 0) {
        this.subRound.currentUserTurnId = nextUserId;
        return;
      }
    }
    console.error('No eligible next player found');
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

  private setupNewSubRound(finishedOrderIds?: string[]): void {
    this.subRound = {
      turnOrderIds: finishedOrderIds ? finishedOrderIds : this.users.map((user) => user.id),
      currentUserTurnId: finishedOrderIds ? finishedOrderIds[0] : this.users[0].id,
      numOfCardsRequiredToPlay: 0,
      discardPile: [],
      players: {},
    };

    this.users.forEach((user) => {
      this.subRound.players[user.id] = {
        passed: false,
        hadAleastOneTurn: false,
      };
    });
  }

  private setupNewRound(): void {
    // Reset Round
    this.round = getScumRound();

    // Populate hands with users.
    this.users.forEach((user) => {
      this.round.hands[user.id] = {
        cards: [],
      };
    });

    // Determine how many decks of cards are needed by dividing the number of players by PLAYERS_PER_DECK. If there is a remainder, add 1 to the number of decks.
    const numberOfDecks = Math.ceil(this.users.length / this.PLAYERS_PER_DECK);

    // Create a deck of cards for each deck needed.
    const deck = new DeckOfCards({ numOfDecks: numberOfDecks });
    deck.shuffle();
    const cards = deck.getCards();

    // Deal cards to each hand.
    let iterator = 0;
    while (cards.length > 0) {
      this.round.hands[this.subRound.turnOrderIds[iterator]].cards.push(cards.pop());
      iterator++;
      if (iterator >= this.users.length) {
        iterator = 0;
      }
    }

    // Sort players hands by card value.
    for (const hand in this.round.hands) {
      this.round.hands[hand].cards.sort(sortCardsByOrder);
    }
  }

  public getCurrentGameState(userId?: string): ScumGameState {
    return {
      gameOwnerUserId: this.users[0]?.id || '',
      hand: userId ? this.round.hands[userId].cards : [],
      discardPile: this.subRound.discardPile,
      numOfCardsRequiredToPlay: this.subRound.numOfCardsRequiredToPlay,
      phase: this.phase,
      currentUserTurnId: this.subRound.currentUserTurnId,
      presidentTraded: this.presidentTraded,
      vicePresidentTraded: this.vicePresidentTraded,
      players: this.users.map((user) => {
        return {
          user,
          numOfCards: this.round.hands[user.id]?.cards.length || 0,
          passed: this.subRound.players[user.id]?.passed || false,
          finished: this.round.finishOrderIds.includes(user.id),
        };
      }),
    };
  }
}

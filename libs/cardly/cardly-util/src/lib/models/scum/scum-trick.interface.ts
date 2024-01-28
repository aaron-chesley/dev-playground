import { Card, CardlyUser, Rank } from '../cardly';
import { ScumHand } from './scum-hand.interface';

interface ScumTrickPlayer {
  passed: boolean;
  hadAleastOneTurn: boolean;
}

export interface ScumDiscardPile {
  userId: string;
  cards: Card[];
}

export class ScumTrick {
  currentUserTurnId: string;
  discardPile: ScumDiscardPile[];
  players: { [userId: string]: ScumTrickPlayer };

  get requiredDiscardSize(): number {
    return this.discardPile.length && this.discardPile.length > 0
      ? this.discardPile[this.discardPile.length - 1].cards.length
      : undefined;
  }

  get currentDiscardOrder(): number {
    return this.discardPile.length && this.discardPile.length > 0
      ? this.discardPile[this.discardPile.length - 1].cards[0].order
      : undefined;
  }

  public addCardsToDiscardPile(cards: Card[], userId: string) {
    this.discardPile.push({ userId, cards });
    this.players[userId].hadAleastOneTurn = true;
  }

  public isValidDiscard(cards: Card[], hand: ScumHand): boolean {
    // Must have cards to play
    if (cards.length === 0) {
      console.error('Cannot play turn without playing any cards.');
      return false;
    }
    // Must place the correct number of cards. If there are no cards in the discard pile, then any number of cards can be played.
    if (this.requiredDiscardSize && cards.length !== this.requiredDiscardSize) {
      console.error(`Must play ${this.requiredDiscardSize} cards.`);
      return false;
    }
    // All cards must be the same rank
    if (!cards.every((card) => card.rank === cards[0].rank)) {
      console.error('All cards must be the same rank.');
      return false;
    }
    // All cards must be higher than the last card played
    if (this.discardPile.length > 0) {
      if (cards[0].order <= this.currentDiscardOrder) {
        console.error('Must play cards higher than the last card played.');
        return false;
      }
    }

    if (!this.isEveryCardInHand(cards, hand)) {
      console.error('Cannot play cards that are not in your hand.');
      return false;
    }

    return true;
  }

  public setupNextTrick(hands: { [userId: string]: ScumHand }) {
    // Set the currentUserTurnId to the winner of the last trick by finding the hand with the lowest finishOrder
    this.currentUserTurnId = Object.values(hands).reduce((acc, hand) => {
      if (hand.finishOrder < acc.finishOrder) {
        return hand;
      }
      return acc;
    }).userId;
    this.discardPile = [];
    for (const userId in this.players) {
      this.players[userId].passed = false;
      this.players[userId].hadAleastOneTurn = false;
    }
  }

  public wasAceLastCardPlayed(): boolean {
    const lastPile = this.discardPile[this.discardPile.length - 1];
    if (!lastPile) {
      return false;
    }
    const lastCard = lastPile.cards[lastPile.cards.length - 1];
    return lastCard.rank === Rank.ACE;
  }

  public resetTrick() {
    this.discardPile = [];
    for (const userId in this.players) {
      this.players[userId].passed = false;
      this.players[userId].hadAleastOneTurn = false;
    }
  }

  private isEveryCardInHand(cards: Card[], hand: ScumHand) {
    return cards.every((cardBeingPlayed) => {
      const countInHand = hand.cards.filter(
        (cardInHand) => cardBeingPlayed.rank === cardInHand.rank && cardBeingPlayed.suit === cardInHand.suit,
      ).length;

      return countInHand >= cards.filter((c) => c === cardBeingPlayed).length;
    });
  }

  constructor(users: CardlyUser[]) {
    this.currentUserTurnId = '';
    this.discardPile = [];
    this.players = users.reduce((acc: { [userId: string]: ScumTrickPlayer }, user) => {
      acc[user.id] = { passed: false, hadAleastOneTurn: false };
      return acc;
    }, {});
  }
}

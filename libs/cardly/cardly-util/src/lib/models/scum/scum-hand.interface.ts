import { Card } from '../cardly';

export interface ScumHand {
  userId: string;
  cards: Card[];
  turnOrder: number;
  finishOrder: number;
}

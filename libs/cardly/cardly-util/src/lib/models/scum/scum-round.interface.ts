import { ScumHand } from './scum-hand.interface';

export interface ScumRound {
  hands: { [userId: string]: ScumHand };
  finishOrderIds: string[];
}

export const getScumRound = (): ScumRound => ({
  hands: {},
  finishOrderIds: [],
});

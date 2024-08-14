import { Serialized } from '@playground/shared/util/typescript';
import { CardlyGame } from './cardly-game.enum';

interface ICardlyPayload {
  game: CardlyGame;
  type: string;
}

export class CardlyPayload implements ICardlyPayload {
  readonly game: CardlyGame;
  readonly type: string;

  constructor(game: CardlyGame, type: string) {
    this.game = game;
    this.type = type;
  }

  toString(): string {
    return JSON.stringify(this);
  }

  toSerializedObject<T extends this>(): Serialized<T> {
    return { ...this } as unknown as Serialized<T>;
  }
}

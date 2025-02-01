import { CardlyUser, CardlyPayload } from '@playground/cardly-util';
import { Serialized } from '@playground/shared/util/typescript';

export interface GameManager {
  handleMessage(msg: Serialized<CardlyPayload>, user: CardlyUser): void;
}

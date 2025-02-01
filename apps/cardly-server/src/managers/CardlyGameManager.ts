import { CardlyUser, CardlyPayload, CardlyGame } from '@playground/cardly-util';
import { GameManager } from './GameManager';
import { Serialized } from '@playground/shared/util/typescript';

export class CardlyGameManager implements GameManager {
  private gameHandlers: { [gameType: string]: GameManager } = {};

  constructor() {}

  public registerGameManager(gameType: CardlyGame.SCUM, gameManager: GameManager): void {
    this.gameHandlers[gameType] = gameManager;
  }

  public handleMessage(msg: Serialized<CardlyPayload>, user: CardlyUser): void {
    const handler = this.gameHandlers[msg.game];

    if (!handler) {
      console.error('Game type not found: ', msg.game);
      return;
    }

    handler.handleMessage(msg, user);
  }
}

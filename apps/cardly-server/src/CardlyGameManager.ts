import { CardlyGame, CardlyPayload, CardlyUser } from '@playground/cardly-util';
import { ScumGameManager } from './ScumGameManager';
import { CommunicationService } from './CommunicationService';
import { Serialized } from '@playground/shared/util/typescript';

export class CardlyGameManager {
  gameHandlers: { [gameType: string]: any };

  constructor(private commService: CommunicationService) {
    this.gameHandlers = {
      [CardlyGame.SCUM]: new ScumGameManager(this.commService),
    };
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

import {
  CardlyUser,
  CreateNewGameSuccess,
  ScumGame,
  SubscribeToGameUpdatesPayload,
  JoinGameSuccess,
  GameUpdate,
  JoinGamePayload,
  StartGamePayload,
  PlayCardsPayload,
  PassTurnPayload,
  StartNewRoundPayload,
  SwapCardsPayload,
  CreateNewGamePayload,
  UnsubscribeFromGameUpdatesPayload,
  ScumPayload,
} from '@playground/cardly-util';
import { CommunicationService } from './CommunicationService';
import { Serialized } from '@playground/shared/util/typescript';

export class ScumGameManager {
  games: { [gameId: string]: ScumGame } = {};
  messageHandlers: { [type: string]: (msg: Serialized<ScumPayload>, user: CardlyUser) => void } = {
    createNewGame: this.createNewGame,
    subscribeToGameUpdates: this.subscribeToGameUpdates,
    joinGame: this.joinGame,
    startGame: this.startGame,
    playCards: this.playCards,
    passTurn: this.passTurn,
    startNewRound: this.startNewRound,
    swapCards: this.swapCards,
    unsubscribeFromGameUpdates: this.unsubscribeFromGameUpdates,
  };

  constructor(private commService: CommunicationService) {}

  public handleMessage(msg: Serialized<ScumPayload>, user: CardlyUser): void {
    const handler = this.messageHandlers[msg.type];
    if (handler) {
      handler.call(this, msg, user);
    } else {
      console.error('No handler for message type: ', msg.type);
    }
  }

  private createNewGame(msg: Serialized<CreateNewGamePayload>, user: CardlyUser): void {
    const game = new ScumGame(user);
    const gameId = game.gameId;
    this.games[gameId] = game;
    const res = new CreateNewGameSuccess(gameId).toSerializedObject();
    this.commService.sendToUser(user.id, res);
  }

  private subscribeToGameUpdates(msg: Serialized<SubscribeToGameUpdatesPayload>, user: CardlyUser): void {
    this.commService.joinGameRoom(user.id, msg.gameId);
    const game = this.games[msg.gameId];
    const res = new GameUpdate(game.getCurrentGameState(user.id)).toSerializedObject();
    this.commService.sendToUser(user.id, res);
  }

  private unsubscribeFromGameUpdates(msg: Serialized<UnsubscribeFromGameUpdatesPayload>, user: CardlyUser): void {
    this.commService.leaveGameRoom(user.id, msg.gameId);
  }

  private joinGame(msg: Serialized<JoinGamePayload>, user: CardlyUser): void {
    const game = this.games[msg.gameId];
    game.addUserToGame(user);
    this.sendGameStateToUsers(game.gameId);
    const res = new JoinGameSuccess(game.gameId).toSerializedObject();
    this.commService.sendToUser(user.id, res);
  }

  private startGame(msg: Serialized<StartGamePayload>, user: CardlyUser): void {
    const game = this.games[msg.gameId];
    game.startGame();
    this.sendGameStateToUsers(game.gameId);
  }

  private playCards(msg: Serialized<PlayCardsPayload>, user: CardlyUser): void {
    const game = this.games[msg.data.gameId];
    game.playCards({
      userId: user.id,
      cardsInPlay: msg.data.cards,
    });
    this.sendGameStateToUsers(game.gameId);
  }

  private passTurn(msg: Serialized<PassTurnPayload>, user: CardlyUser): void {
    const game = this.games[msg.gameId];
    game.passTurn(user.id);
    this.sendGameStateToUsers(game.gameId);
  }

  private startNewRound(msg: Serialized<StartNewRoundPayload>, user: CardlyUser): void {
    const game = this.games[msg.gameId];
    game.startNewRound();
    this.sendGameStateToUsers(game.gameId);
  }

  private swapCards(msg: Serialized<SwapCardsPayload>, user: CardlyUser): void {
    const game = this.games[msg.data.gameId];
    game.swapCards({ userId: user.id, cards: msg.data.cards });
    this.sendGameStateToUsers(game.gameId);
  }

  private sendGameStateToUsers(gameId: string): void {
    const game = this.games[gameId];
    const users = game.getUsers();
    for (const user of users) {
      const res = new GameUpdate(game.getCurrentGameState(user.id)).toSerializedObject();
      this.commService.sendToUser(user.id, res);
    }
  }
}

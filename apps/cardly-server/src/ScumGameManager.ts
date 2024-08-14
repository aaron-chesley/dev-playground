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
} from '@playground/cardly-util';
import { CommunicationService } from './CommunicationService';
import { Serialized } from '@playground/shared/util/typescript';

export class ScumGameManager {
  games: { [gameId: string]: ScumGame } = {};

  constructor(private commService: CommunicationService) {}

  public handleMessage(msg: any, user: CardlyUser): void {
    switch (msg.type) {
      case 'createNewGame':
        this.createNewGame(msg, user);
        break;
      case 'subscribeToGameUpdates':
        this.subscribeToGameUpdates(msg, user);
        break;
      case 'joinGame':
        this.joinGame(msg, user);
        break;
      case 'startGame':
        this.startGame(msg, user);
        break;
      case 'playCards':
        this.playCards(msg, user);
        break;
      case 'passTurn':
        this.passTurn(msg, user);
        break;
      case 'startNewRound':
        this.startNewRound(msg, user);
        break;
      case 'swapCards':
        this.swapCards(msg, user);
        break;
      case 'unsubscribeFromGameUpdates':
        this.unsubscribeFromGameUpdates(msg, user);
        break;
      default:
        console.error('Invalid message type: ', msg.type);
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

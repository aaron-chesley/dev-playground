import { Serialized } from '@playground/shared/util/typescript';
import { Card, CardlyPayload } from '../cardly';
import { CardlyGame } from '../cardly/cardly-game.enum';
import { ScumGameUI } from './scum-game-ui.interface';

export class ScumPayload extends CardlyPayload {
  constructor(type: string) {
    super(CardlyGame.SCUM, type);
  }
}

export class CreateNewGamePayload extends ScumPayload {
  constructor() {
    super('createNewGame');
  }
}

export class CreateNewGameSuccess extends ScumPayload {
  readonly gameId: string;

  constructor(gameId: string) {
    super('[ws] CreateNewGameSuccess');
    this.gameId = gameId;
  }
}

export class SubscribeToGameUpdatesPayload extends ScumPayload {
  readonly gameId: string;

  constructor(gameId: string) {
    super('subscribeToGameUpdates');
    this.gameId = gameId;
  }
}

export class UnsubscribeFromGameUpdatesPayload extends ScumPayload {
  readonly gameId: string;

  constructor(gameId: string) {
    super('unsubscribeFromGameUpdates');
    this.gameId = gameId;
  }
}

export class JoinGamePayload extends ScumPayload {
  readonly gameId: string;

  constructor(gameId: string) {
    super('joinGame');
    this.gameId = gameId;
  }
}

export class JoinGameSuccess extends ScumPayload {
  readonly gameId: string;

  constructor(gameId: string) {
    super('[ws] JoinGameSuccess');
    this.gameId = gameId;
  }
}

export class GameUpdate extends ScumPayload {
  readonly gameState: ScumGameUI;

  constructor(game: ScumGameUI) {
    super('[ws] GameUpdate');
    this.gameState = game;
  }
}

export class StartGamePayload extends ScumPayload {
  readonly gameId: string;

  constructor(gameId: string) {
    super('startGame');
    this.gameId = gameId;
  }
}

export class PlayCards {
  gameId: string;
  cards: Card[];
}

export class PlayCardsPayload extends ScumPayload {
  readonly data: PlayCards;

  constructor(data: PlayCards) {
    super('playCards');
    this.data = data;
  }
}

export class PassTurnPayload extends ScumPayload {
  readonly gameId: string;

  constructor(gameId: string) {
    super('passTurn');
    this.gameId = gameId;
  }
}

export class StartNewRoundPayload extends ScumPayload {
  readonly gameId: string;

  constructor(gameId: string) {
    super('startNewRound');
    this.gameId = gameId;
  }
}

export class SwapCardsPayload extends ScumPayload {
  readonly data: {
    gameId: string;
    cards: Card[];
  };

  constructor(data: { gameId: string; cards: Card[] }) {
    super('swapCards');
    this.data = data;
  }
}

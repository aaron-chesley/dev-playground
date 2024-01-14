import { CardlyUser } from '@playground/cardly-util';
import { ScumGameState } from 'libs/cardly/cardly-util/src/lib/models/scum/scum-game-state.interface';
import { Observable } from 'rxjs';

export interface ScumGameService {
  gameState$: Observable<ScumGameState>;
  stagedCardIndices$: Observable<number[]>;
  addPlayerToGame(user: CardlyUser): void;
  startGame(): void;
  playCards(): void;
  passTurn(userId: string): void;
  stageCard(cardIndex: number): void;
  unstageCard(cardIndex: number): void;
}

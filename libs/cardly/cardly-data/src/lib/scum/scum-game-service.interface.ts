import { CardlyUser } from '@playground/cardly-util';
import { ScumGameUI } from 'libs/cardly/cardly-util/src/lib/models/scum/scum-game-ui.interface';
import { Observable } from 'rxjs';

export interface ScumGameService {
  gameState$: Observable<ScumGameUI>;
  addPlayerToGame(user: CardlyUser): void;
  startGame(): void;
  playCards(): void;
  passTurn(userId: string): void;
}

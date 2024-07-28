import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScumGameBoardComponent } from '@playground/cardly-ui';
import { AsyncPipe } from '@angular/common';
import { ScumActions } from '@playground/cardly-data';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'scum-lobby-feature',
  template: `<form>
      <button type="button" (click)="createNewGame()">Create New Game</button>
    </form>
    <form>
      <input type="text" required placeholder="Enter game id" name="gameId" [(ngModel)]="gameId" />
      <button type="button" (click)="joinGame(gameId)">Join Game</button>
    </form>`,
  styles: [
    `
      :host {
        display: flex;
        gap: 50px;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      form {
        display: flex;
        gap: 5px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 200px;
      }

      form > * {
        width: 100%;
      }

      form > span {
        text-align: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, ScumGameBoardComponent, FormsModule],
})
export class ScumLobbyFeatureComponent {
  gameId = '';

  createNewGame() {
    this.store.dispatch(ScumActions.createNewGame());
  }

  joinGame(gameId: string) {
    this.store.dispatch(ScumActions.joinGame({ gameId }));
  }

  constructor(private store: Store) {}
}

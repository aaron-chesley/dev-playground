import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScumGameBoardComponent } from '@playground/cardly-ui';
import { AsyncPipe } from '@angular/common';
import { ScumActions } from '@playground/cardly-data';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PlayButtonComponent, PlayInputTextComponent } from '@playground/play-ui';

@Component({
  selector: 'scum-lobby-feature',
  template: ` <form>
      <input playInputText type="text" required placeholder="Enter game id" name="gameId" [(ngModel)]="gameId" />
      <button playButton appearance="play-flat" theme="accent" (click)="joinGame(gameId)">Join Game</button>
    </form>
    <span>OR</span>
    <form>
      <button playButton appearance="play-flat" theme="accent" (click)="createNewGame()">Create New Game</button>
    </form>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        height: 100%;
      }

      span {
        font-size: 1.5rem;
        color: #fff;
        font-weight: bold;
      }

      form {
        display: flex;
        gap: 5px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 200px;
      }

      form > * {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, ScumGameBoardComponent, FormsModule, PlayInputTextComponent, PlayButtonComponent],
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

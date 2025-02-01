import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AuthActions, ScumActions, ScumGameState, selectIsLoading } from '@playground/cardly-data';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PlayButtonComponent, PlayInputTextComponent, PlayLoadingDirective } from '@playground/play-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'scum-lobby-feature',
  template: `
    <div class="container" [playLoading]="loading$ | async">
      <form>
        <input playInputText type="text" required placeholder="Enter game id" name="gameId" [(ngModel)]="gameId" />
        <button playButton appearance="play-flat" theme="accent" (click)="joinGame(gameId)">Join Game</button>
      </form>
      <span>OR</span>
      <form>
        <button playButton appearance="play-flat" theme="accent" (click)="createNewGame()">Create New Game</button>
      </form>
      <form>
        <button playButton appearance="play-flat" theme="accent" (click)="logout()">Logout</button>
      </form>
    </div>
  `,
  styles: [
    `
      .container {
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
  imports: [
    AsyncPipe,
    FormsModule,
    PlayInputTextComponent,
    PlayButtonComponent,
    PlayLoadingDirective,
  ],
})
export class ScumLobbyFeatureComponent implements OnInit {
  gameId = '';
  loading$: Observable<boolean>;

  ngOnInit(): void {
    this.loading$ = this.scumStore.select(selectIsLoading);
  }

  createNewGame() {
    this.scumStore.dispatch(ScumActions.createNewGame());
  }

  joinGame(gameId: string) {
    this.scumStore.dispatch(ScumActions.joinGame({ gameId }));
  }

  logout() {
    this.scumStore.dispatch(AuthActions.logout());
  }

  constructor(private scumStore: Store<ScumGameState>) {}
}

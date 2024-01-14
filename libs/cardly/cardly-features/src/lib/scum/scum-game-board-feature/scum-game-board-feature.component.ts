import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScumGameBoardComponent } from '@playground/cardly-ui';
import { ScumGameDemoService, demoCardlyUsers } from '@playground/cardly-data';
import { AsyncPipe } from '@angular/common';
import { Card, CardlyUser } from '@playground/cardly-util';
import { Observable, map } from 'rxjs';
import { ScumGameState } from 'libs/cardly/cardly-util/src/lib/models/scum/scum-game-state.interface';

@Component({
  selector: 'scum-game-board-feature',
  template: `<scum-game-board
    [game]="gameState$ | async"
    [stagedCardIndices]="stagedCardIndices$ | async"
    [user]="currentUser$ | async"
    (startGame)="startGame()"
    (stageCard)="stageCard($event)"
    (unstageCard)="unstageCard($event)"
    (passTurn)="passTurn($event)"
    (confirmStagedCardsSelection)="confirmStagedCardsSelection()"
  ></scum-game-board>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, ScumGameBoardComponent],
})
export class ScumGameBoardFeatureComponent {
  gameState$: Observable<ScumGameState>;
  currentUser$: Observable<CardlyUser>;
  stagedCardIndices$: Observable<number[]>;

  startGame(): void {
    this.scumGameService.startGame();
  }

  stageCard(cardIndex: number): void {
    this.scumGameService.stageCard(cardIndex);
  }

  unstageCard(cardIndex: number): void {
    this.scumGameService.unstageCard(cardIndex);
  }

  passTurn(userId: string): void {
    this.scumGameService.passTurn(userId);
  }

  confirmStagedCardsSelection(): void {
    this.scumGameService.playCards();
  }

  constructor(private scumGameService: ScumGameDemoService) {
    this.gameState$ = this.scumGameService.gameState$;
    this.stagedCardIndices$ = this.scumGameService.stagedCardIndices$;
    this.currentUser$ = this.gameState$.pipe(
      map((gameState) => {
        // return demoCardlyUsers[1];
        return gameState.currentUserTurnId
          ? demoCardlyUsers.find((user) => user.id === gameState.currentUserTurnId)
          : demoCardlyUsers[0];
      }),
    );
  }
}

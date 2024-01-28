import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ScumGameBoardComponent } from '@playground/cardly-ui';
import { CardlyAuthenticationService, ScumGameStateService } from '@playground/cardly-data';
import { AsyncPipe } from '@angular/common';
import { CardlyUser, ScumGameUI } from '@playground/cardly-util';
import { Observable, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'scum-game-board-feature',
  template: `<scum-game-board
    [game]="gameState$ | async"
    [stagedCardIndices]="stagedCardIndices$ | async"
    [user]="currentUser$ | async"
    (startGame)="startGame()"
    (stageCard)="stageCard($event)"
    (unstageCard)="unstageCard($event)"
    (passTurn)="passTurn()"
    (confirmStagedCardsSelection)="confirmStagedCardsSelection()"
    (startNewRound)="startNewRound()"
    (swapCards)="swapCards()"
  ></scum-game-board>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, ScumGameBoardComponent],
})
export class ScumGameBoardFeatureComponent implements OnDestroy {
  gameState$: Observable<ScumGameUI>;
  currentUser$: Observable<CardlyUser>;
  stagedCardIndices$: Observable<number[]>;

  startGame(): void {
    this.state.startGame(this.activatedRoute.snapshot.params.gameId);
  }

  stageCard(cardIndex: number): void {
    this.state.stageCard(cardIndex);
  }

  unstageCard(cardIndex: number): void {
    this.state.unstageCard(cardIndex);
  }

  passTurn(): void {
    this.state.passTurn(this.activatedRoute.snapshot.params.gameId);
  }

  confirmStagedCardsSelection(): void {
    this.state.playCards(this.activatedRoute.snapshot.params.gameId);
  }

  startNewRound(): void {
    this.state.startNewRound(this.activatedRoute.snapshot.params.gameId);
  }

  swapCards(): void {
    this.state.swapCards(this.activatedRoute.snapshot.params.gameId);
  }

  private subscribeToGameUpdates(): void {
    this.state.subscribeToGameUpdates(this.activatedRoute.snapshot.params.gameId);
  }

  ngOnDestroy(): void {
    this.state.clearState();
    this.state.unsubscribeFromGameUpdates(this.activatedRoute.snapshot.params.gameId);
  }

  constructor(
    private state: ScumGameStateService,
    private authService: CardlyAuthenticationService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.gameState$ = this.state.gameState$;
    this.stagedCardIndices$ = this.state.stagedCardIndices$;
    this.currentUser$ = from(this.authService.getUser());
    this.subscribeToGameUpdates();
  }
}

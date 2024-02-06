import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ScumGameBoardComponent, ScumTrickWinnerComponent } from '@playground/cardly-ui';
import { CardlyAuthenticationService, ScumGameStateService } from '@playground/cardly-data';
import { AsyncPipe } from '@angular/common';
import { CardlyUser, ScumGameUI } from '@playground/cardly-util';
import { Observable, Subject, filter, from, of, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PlayModalModule, PlayModalService } from '@playground/play-ui';

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
  imports: [AsyncPipe, ScumGameBoardComponent, PlayModalModule],
})
export class ScumGameBoardFeatureComponent implements OnDestroy {
  gameState$: Observable<ScumGameUI>;
  currentUser$: Observable<CardlyUser>;
  stagedCardIndices$: Observable<number[]>;
  ngDestroy$ = new Subject<void>();

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
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  constructor(
    private state: ScumGameStateService,
    private authService: CardlyAuthenticationService,
    private activatedRoute: ActivatedRoute,
    private modalService: PlayModalService,
  ) {
    this.gameState$ = this.state.gameState$;
    this.stagedCardIndices$ = this.state.stagedCardIndices$;
    this.currentUser$ = of(this.authService.getUserFromToken());
    this.subscribeToGameUpdates();
    this.state.trickWinner$.pipe(takeUntil(this.ngDestroy$), filter(Boolean)).subscribe((winner) => {
      const ref = this.modalService.custom(ScumTrickWinnerComponent, {
        data: { winner: winner.name, cards: winner.cards },
      });

      setTimeout(() => {
        ref.close();
      }, 2500);
    });
  }
}

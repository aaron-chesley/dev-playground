import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ScumGameBoardComponent, ScumTrickWinnerComponent } from '@playground/cardly-ui';
import {
  CardlyAuthenticationService,
  ScumActions,
  ScumGameState,
  selectGameState,
  selectStagedCardIndices,
  selectTrickWinner,
} from '@playground/cardly-data';
import { AsyncPipe } from '@angular/common';
import { CardlyUser, ScumGameUI } from '@playground/cardly-util';
import { distinctUntilChanged, filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PlayModalModule, PlayModalService } from '@playground/play-ui';
import { Store } from '@ngrx/store';

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
export class ScumGameBoardFeatureComponent implements OnInit, OnDestroy {
  gameState$: Observable<ScumGameUI>;
  currentUser$: Observable<CardlyUser>;
  stagedCardIndices$: Observable<number[]>;
  ngDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.store.dispatch(ScumActions.subscribeToGameUpdates({ gameId: this.activatedRoute.snapshot.params.gameId }));
    this.gameState$ = this.store.select(selectGameState);
    this.stagedCardIndices$ = this.store.select(selectStagedCardIndices);
  }

  startGame(): void {
    this.store.dispatch(ScumActions.startGame({ gameId: this.activatedRoute.snapshot.params.gameId }));
  }

  stageCard(cardIndex: number): void {
    this.store.dispatch(ScumActions.stageCard({ cardIndex }));
  }

  unstageCard(cardIndex: number): void {
    this.store.dispatch(ScumActions.unstageCard({ cardIndex }));
  }

  passTurn(): void {
    this.store.dispatch(ScumActions.passTurn({ gameId: this.activatedRoute.snapshot.params.gameId }));
  }

  confirmStagedCardsSelection(): void {
    this.store.dispatch(ScumActions.playCards({ gameId: this.activatedRoute.snapshot.params.gameId }));
  }

  startNewRound(): void {
    this.store.dispatch(ScumActions.startNewRound({ gameId: this.activatedRoute.snapshot.params.gameId }));
  }

  swapCards(): void {
    this.store.dispatch(ScumActions.swapCards({ gameId: this.activatedRoute.snapshot.params.gameId }));
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.store.dispatch(ScumActions.clearState());
    this.store.dispatch(ScumActions.unsubscribeFromGameUpdates({ gameId: this.activatedRoute.snapshot.params.gameId }));
  }

  constructor(
    private store: Store<ScumGameState>,
    private authService: CardlyAuthenticationService,
    private activatedRoute: ActivatedRoute,
    private modalService: PlayModalService,
  ) {
    this.currentUser$ = of(this.authService.getUserFromToken());
    this.store
      .select(selectTrickWinner)
      .pipe(
        takeUntil(this.ngDestroy$),
        filter(Boolean),
        distinctUntilChanged((prev, curr) => prev?.id === curr?.id),
      )
      .subscribe((winner) => {
        this.modalService.custom(ScumTrickWinnerComponent, {
          data: { winner: winner.name, cards: winner.cards },
        });
      });
  }
}

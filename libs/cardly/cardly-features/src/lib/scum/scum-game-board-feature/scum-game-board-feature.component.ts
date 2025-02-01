import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ScumGameBoardComponent } from '@playground/cardly-ui';
import {
  AuthenticationState,
  ScumActions,
  ScumGameState,
  selectGameState,
  selectStagedCardIndices,
  selectUser,
} from '@playground/cardly-data';
import { AsyncPipe } from '@angular/common';
import { CardlyUser, ScumGameUI } from '@playground/cardly-util';
import { Observable, Subject } from 'rxjs';
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
    const gameId = this.activatedRoute.snapshot.params.gameId;
    this.scumStore.dispatch(ScumActions.subscribeToGameUpdates({ gameId }));
    this.gameState$ = this.scumStore.select(selectGameState);
    this.stagedCardIndices$ = this.scumStore.select(selectStagedCardIndices);
  }

  startGame(): void {
    this.scumStore.dispatch(ScumActions.startGame());
  }

  stageCard(cardIndex: number): void {
    this.scumStore.dispatch(ScumActions.stageCard({ cardIndex }));
  }

  unstageCard(cardIndex: number): void {
    this.scumStore.dispatch(ScumActions.unstageCard({ cardIndex }));
  }

  passTurn(): void {
    this.scumStore.dispatch(ScumActions.passTurn());
  }

  confirmStagedCardsSelection(): void {
    this.scumStore.dispatch(ScumActions.playCards());
  }

  startNewRound(): void {
    this.scumStore.dispatch(ScumActions.startNewRound());
  }

  swapCards(): void {
    this.scumStore.dispatch(ScumActions.swapCards());
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.scumStore.dispatch(ScumActions.unsubscribeFromGameUpdates());
    this.scumStore.dispatch(ScumActions.clearState());
  }

  constructor(
    private scumStore: Store<ScumGameState>,
    private authStore: Store<AuthenticationState>,
    private activatedRoute: ActivatedRoute,
    private modalService: PlayModalService,
  ) {
    this.currentUser$ = this.authStore.select(selectUser);
  }
}

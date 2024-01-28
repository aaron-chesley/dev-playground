import { Injectable } from '@angular/core';
import {
  CreateNewGameResponse,
  JoinGameRequest,
  JoinGameResponse,
  SubscribeToGameUpdatesRequest,
  ScumGameUI,
  getInitialScumGameUI,
  PlayCardsRequest,
  PassTurnRequest,
  StartNewRoundRequest,
  SwapCardsRequest,
  ScumGamePhase,
} from '@playground/cardly-util';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardlyAuthenticationService, CardlyWebsocketService } from '../../cardly';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ScumGameStateService {
  private gameStateSubject: BehaviorSubject<ScumGameUI>;
  gameState$: Observable<ScumGameUI>;

  private stagedCardIndicesSubject = new BehaviorSubject<number[]>([]);
  stagedCardIndices$ = this.stagedCardIndicesSubject.asObservable();

  async createNewGame(): Promise<void> {
    const user = await this.authService.getUser();
    this.cardlyWebsocket.sendMessage('createNewGame', {}, (res: CreateNewGameResponse) => {
      this.router.navigate(['scum', res.gameId]);
    });
  }

  async joinGame(gameId: string): Promise<void> {
    const user = await this.authService.getUser();
    const payload: JoinGameRequest = { gameId };
    this.cardlyWebsocket.sendMessage('joinGame', payload, (res: JoinGameResponse) => {
      this.router.navigate(['scum', res.gameId]);
    });
  }

  startGame(gameId: string): void {
    this.cardlyWebsocket.sendMessage('startGame', { gameId });
  }

  stageCard(cardIndex: number): void {
    const { hand, phase, discardPile, requiredDiscardSize } = this.gameStateSubject.getValue();
    const stagedCardIndices = this.stagedCardIndicesSubject.getValue();

    if (phase === ScumGamePhase.IN_PROGRESS) {
      if (requiredDiscardSize && stagedCardIndices.length >= requiredDiscardSize) {
        return;
      }
      if (discardPile.length && hand[cardIndex].order <= discardPile[discardPile.length - 1].cards[0].order) {
        return;
      }
      if (stagedCardIndices.length && hand[stagedCardIndices[0]].rank !== hand[cardIndex].rank) {
        return;
      }
    }

    this.stagedCardIndicesSubject.next([...stagedCardIndices, cardIndex]);
  }

  unstageCard(cardIndex: number): void {
    const stagedCards = this.stagedCardIndicesSubject.getValue();
    const cardIndexToRemove = stagedCards.findIndex((index) => index === cardIndex);
    stagedCards.splice(cardIndexToRemove, 1);
    this.stagedCardIndicesSubject.next([...stagedCards]);
  }

  playCards(gameId: string): void {
    const stagedCardIndices = this.stagedCardIndicesSubject.getValue();
    const cards = stagedCardIndices.map((index) => this.gameStateSubject.getValue().hand[index]);
    const payload: PlayCardsRequest = { gameId, cards };
    this.stagedCardIndicesSubject.next([]);
    this.cardlyWebsocket.sendMessage('playCards', payload);
  }

  passTurn(gameId: string): void {
    const payload: PassTurnRequest = { gameId };
    this.stagedCardIndicesSubject.next([]);
    this.cardlyWebsocket.sendMessage('passTurn', payload);
  }

  subscribeToGameUpdates(gameId: string): void {
    const payload: SubscribeToGameUpdatesRequest = { gameId };
    this.cardlyWebsocket.sendMessage('subscribeToGameUpdates', payload);
  }

  unsubscribeFromGameUpdates(gameId: string): void {
    const payload: SubscribeToGameUpdatesRequest = { gameId };
    this.cardlyWebsocket.sendMessage('unsubscribeFromGameUpdates', payload);
  }

  startNewRound(gameId: string): void {
    const payload: StartNewRoundRequest = { gameId };
    this.cardlyWebsocket.sendMessage('startNewRound', payload);
  }

  swapCards(gameId: string): void {
    const cards = this.stagedCardIndicesSubject.getValue().map((index) => this.gameStateSubject.getValue().hand[index]);
    const payload: SwapCardsRequest = { gameId, cards };
    this.stagedCardIndicesSubject.next([]);
    this.cardlyWebsocket.sendMessage('swapCards', payload, () => {});
  }

  clearState(): void {
    this.gameStateSubject.next(getInitialScumGameUI());
    this.stagedCardIndicesSubject.next([]);
  }

  constructor(
    private router: Router,
    private cardlyWebsocket: CardlyWebsocketService,
    private authService: CardlyAuthenticationService,
  ) {
    this.gameStateSubject = new BehaviorSubject<ScumGameUI>(getInitialScumGameUI());
    this.gameState$ = this.gameStateSubject.asObservable();

    this.cardlyWebsocket.receiveMessage('gameStateUpdate', (message) => {
      this.gameStateSubject.next(message);
    });
  }
}

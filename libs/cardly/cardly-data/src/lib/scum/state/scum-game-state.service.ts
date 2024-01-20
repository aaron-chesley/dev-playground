import { Injectable } from '@angular/core';
import {
  CreateNewGameRequest,
  CreateNewGameResponse,
  JoinGameRequest,
  JoinGameResponse,
  SubscribeToGameUpdatesRequest,
  ScumGameState,
  getInitialScumGameState,
  PlayCardsRequest,
  PassTurnRequest,
  StartNewRoundRequest,
  SwapCardsRequest,
} from '@playground/cardly-util';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardlyAuthenticationService, CardlyWebsocketService } from '../../cardly';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ScumGameStateService {
  private gameStateSubject: BehaviorSubject<ScumGameState>;
  gameState$: Observable<ScumGameState>;

  private stagedCardIndicesSubject = new BehaviorSubject<number[]>([]);
  stagedCardIndices$ = this.stagedCardIndicesSubject.asObservable();

  createNewGame(): void {
    const user = this.authService.getUser();
    const payload: CreateNewGameRequest = { user };
    this.cardlyWebsocket.sendMessage('createNewGame', payload, (res: CreateNewGameResponse) => {
      this.router.navigate(['scum', res.gameId]);
    });
  }

  joinGame(gameId: string): void {
    const user = this.authService.getUser();
    const payload: JoinGameRequest = { user, gameId };
    this.cardlyWebsocket.sendMessage('joinGame', payload, (res: JoinGameResponse) => {
      this.router.navigate(['scum', res.gameId]);
    });
  }

  startGame(gameId: string): void {
    this.cardlyWebsocket.sendMessage('startGame', { gameId });
  }

  stageCard(cardIndex: number): void {
    const stagedCards = this.stagedCardIndicesSubject.getValue();
    this.stagedCardIndicesSubject.next([...stagedCards, cardIndex]);
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
    const userId = this.authService.getUser().id;
    const payload: PlayCardsRequest = { gameId, userId, cards };
    this.stagedCardIndicesSubject.next([]);
    this.cardlyWebsocket.sendMessage('playCards', payload);
  }

  passTurn(gameId: string): void {
    const userId = this.authService.getUser().id;
    const payload: PassTurnRequest = { gameId, userId };
    this.cardlyWebsocket.sendMessage('passTurn', payload);
  }

  subscribeToGameUpdates(gameId: string): void {
    const userId = this.authService.getUser().id;
    const payload: SubscribeToGameUpdatesRequest = { gameId, userId };
    this.cardlyWebsocket.sendMessage('subscribeToGameUpdates', payload);
  }

  startNewRound(gameId: string): void {
    const payload: StartNewRoundRequest = { gameId };
    this.cardlyWebsocket.sendMessage('startNewRound', payload);
  }

  swapCards(gameId: string): void {
    const cards = this.stagedCardIndicesSubject.getValue().map((index) => this.gameStateSubject.getValue().hand[index]);
    const payload: SwapCardsRequest = { gameId, userId: this.authService.getUser().id, cards };
    this.stagedCardIndicesSubject.next([]);
    this.cardlyWebsocket.sendMessage('swapCards', payload, () => {});
  }

  constructor(
    private router: Router,
    private cardlyWebsocket: CardlyWebsocketService,
    private authService: CardlyAuthenticationService,
  ) {
    this.gameStateSubject = new BehaviorSubject<ScumGameState>(getInitialScumGameState());
    this.gameState$ = this.gameStateSubject.asObservable();

    this.cardlyWebsocket.receiveMessage('gameStateUpdate', (message) => {
      this.gameStateSubject.next(message);
    });
  }
}

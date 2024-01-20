import { Injectable } from '@angular/core';
import { ScumGameService } from './scum-game-service.interface';
import { CardlyUser, ScumGameState, getInitialScumGameState } from '@playground/cardly-util';
import { CardlyWebsocketService } from '../cardly';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ScumGameWebsocketImplService implements ScumGameService {
  private gameStateSubject = new BehaviorSubject<ScumGameState>(getInitialScumGameState());
  gameState$: Observable<ScumGameState> = this.gameStateSubject.asObservable();
  createNewGame(user: CardlyUser): void {
    // this.cardlyWebsocket.send(getCreateNewGamePayload(user));
  }

  addPlayerToGame(user: CardlyUser): void {
    // this.game.addUserToGame(user);
    // this.gameStateSub.next(this.game.getCurrentGameState(this.getCurrentUserTurnId()));
  }

  startGame(): void {
    // this.game.startGame();
    // this.gameStateSub.next(this.game.getCurrentGameState(this.getCurrentUserTurnId()));
  }

  playCards(): void {
    // const stagedCardIndices = this.stagedCardIndicesSub.getValue();
    // const cardsInPlay = stagedCardIndices.map((index) => this.gameStateSub.getValue().hand[index]);
    // this.game.playCards({
    //   userId: this.getCurrentUserTurnId(),
    //   cardsInPlay,
    // });
    // this.stagedCardIndicesSub.next([]);
    // const newGameState = this.game.getCurrentGameState(this.getCurrentUserTurnId());
    // this.gameStateSub.next(newGameState);
  }

  passTurn(userId: string): void {
    // this.game.passTurn(userId);
    // this.gameStateSub.next(this.game.getCurrentGameState(this.getCurrentUserTurnId()));
  }

  private getCurrentUserTurnId(): string {
    return '';
    // return this.game.getCurrentGameState().currentUserTurnId;
  }

  constructor(
    private cardlyWebsocket: CardlyWebsocketService,
    private router: Router,
  ) {
    // this.cardlyWebsocket.onMessage((message) => {
    //   if (message.type === 'scumGameState') {
    //     this.gameStateSubject.next(message.payload);
    //   } else if (message.type === 'newGameCreated') {
    //     this.router.navigate(['scum', message.payload.gameId]);
    //   }
    // });
  }
}

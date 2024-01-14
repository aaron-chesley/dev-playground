import { Injectable } from '@angular/core';
import { ScumGameService } from './scum-game-service.interface';
import { Card, CardlyUser, ScumGame } from '@playground/cardly-util';
import { ScumGameState } from 'libs/cardly/cardly-util/src/lib/models/scum/scum-game-state.interface';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

export const demoCardlyUsers: CardlyUser[] = [
  {
    id: '1a',
    displayName: 'Aaron',
    avatar: 'https://i.pravatar.cc/300',
  },
  {
    id: '2a',
    displayName: 'Bethany',
    avatar: 'https://i.pravatar.cc/300',
  },
  {
    id: '3a',
    displayName: 'Georgia',
    avatar: 'https://i.pravatar.cc/300',
  },
  {
    id: '4a',
    displayName: 'Hazel',
    avatar: 'https://i.pravatar.cc/300',
  },
  {
    id: '5a',
    displayName: 'Donovan',
    avatar: 'https://i.pravatar.cc/300',
  },
];

@Injectable({ providedIn: 'root' })
export class ScumGameDemoService implements ScumGameService {
  private game: ScumGame;
  private gameStateSub: BehaviorSubject<ScumGameState>;
  private stagedCardIndicesSub: BehaviorSubject<number[]>;
  public gameState$: Observable<ScumGameState>;
  public stagedCardIndices$: Observable<number[]>;

  addPlayerToGame(user: CardlyUser): void {
    this.game.addUserToGame(user);
    this.gameStateSub.next(this.game.getCurrentGameState(this.getCurrentUserTurnId()));
  }

  startGame(): void {
    this.game.startGame();
    this.gameStateSub.next(this.game.getCurrentGameState(this.getCurrentUserTurnId()));
  }

  playCards(): void {
    const stagedCardIndices = this.stagedCardIndicesSub.getValue();
    const cardsInPlay = stagedCardIndices.map((index) => this.gameStateSub.getValue().hand[index]);
    this.game.playCards({
      userId: this.getCurrentUserTurnId(),
      cardsInPlay,
    });
    this.stagedCardIndicesSub.next([]);
    const newGameState = this.game.getCurrentGameState(this.getCurrentUserTurnId());
    this.gameStateSub.next(newGameState);
  }

  passTurn(userId: string): void {
    this.game.passTurn(userId);
    this.gameStateSub.next(this.game.getCurrentGameState(this.getCurrentUserTurnId()));
  }

  stageCard(cardIndex: number): void {
    const stagedCards = this.stagedCardIndicesSub.getValue();
    this.stagedCardIndicesSub.next([...stagedCards, cardIndex]);
  }

  unstageCard(cardIndex: number): void {
    const stagedCards = this.stagedCardIndicesSub.getValue();
    const cardIndexToRemove = stagedCards.findIndex((index) => index === cardIndex);
    stagedCards.splice(cardIndexToRemove, 1);
    this.stagedCardIndicesSub.next([...stagedCards]);
  }

  private getCurrentUserTurnId(): string {
    return this.game.getCurrentGameState().currentUserTurnId;
  }

  constructor() {
    this.game = new ScumGame();

    this.gameStateSub = new BehaviorSubject<ScumGameState>(this.game.getCurrentGameState());
    this.gameState$ = this.gameStateSub.asObservable();

    this.stagedCardIndicesSub = new BehaviorSubject<number[]>([]);
    this.stagedCardIndices$ = this.stagedCardIndicesSub.asObservable();

    this.addPlayerToGame(demoCardlyUsers[0]);
    this.addPlayerToGame(demoCardlyUsers[1]);
    this.addPlayerToGame(demoCardlyUsers[2]);
    this.addPlayerToGame(demoCardlyUsers[3]);
    this.addPlayerToGame(demoCardlyUsers[4]);
  }
}

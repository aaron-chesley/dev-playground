import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { Card, CardlyUser, ScumGamePhase, ScumGameState, ScumRank } from '@playground/cardly-util';
import { CardlyPlayingCardComponent } from '../../shared/components/cardly-playing-card/cardly-playing-card.component';
import {
  emojiEvents,
  localParking,
  PlayButtonComponent,
  PlayButtonGroupComponent,
  PlayIconComponent,
  PlayIconRegistryService,
} from '@playground/play-ui';
import { cardlyPlayingCards, cardlyScore } from '../../cardly-icons';
import { fadeAnimation, listAnimation } from '../../animations';

@Component({
  selector: 'scum-game-board',
  templateUrl: './scum-game-board.component.html',
  styleUrls: ['./scum-game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [listAnimation, fadeAnimation],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    NgStyle,
    CardlyPlayingCardComponent,
    PlayButtonComponent,
    PlayButtonGroupComponent,
    PlayButtonComponent,
    PlayButtonGroupComponent,
    PlayIconComponent,
  ],
})
export class ScumGameBoardComponent {
  GamePhase = ScumGamePhase;
  ScumRank = ScumRank;
  @HostBinding('class.scum-game-board') class = 'scum-game-board';
  @Input() game: ScumGameState;
  @Input() user: CardlyUser;
  @Input() stagedCardIndices: number[];
  @Output() onSwipeLeft = new EventEmitter();
  @Output() onSwipeRight = new EventEmitter();
  @Output() startGame = new EventEmitter();
  @Output() passTurn = new EventEmitter();
  @Output() stageCard = new EventEmitter<number>();
  @Output() unstageCard = new EventEmitter<number>();
  @Output() confirmStagedCardsSelection = new EventEmitter();
  @Output() startNewRound = new EventEmitter();
  @Output() swapCards = new EventEmitter();

  get gamePhase(): ScumGamePhase {
    return this.game.phase;
  }

  get hand(): Card[] {
    return this.game.hand;
  }

  get players(): ScumGameState['players'] {
    return this.game.players;
  }

  get currentUserTurnId(): string {
    return this.game.currentUserTurnId;
  }

  get isMyTurn(): boolean {
    return this.currentUserTurnId && this.currentUserTurnId === this.user.id;
  }

  get gameOwnerUserId(): string {
    return this.game.gameOwnerUserId;
  }

  get discardPile(): Card[] {
    return this.game.discardPile;
  }

  get numOfCardsRequiredToPlay(): number {
    return this.game.numOfCardsRequiredToPlay;
  }

  get president(): CardlyUser {
    return this.players[0].user;
  }

  get vicePresident(): CardlyUser {
    return this.players[1].user;
  }

  get scum(): CardlyUser {
    return this.players[this.players.length - 1].user;
  }

  get viceScum(): CardlyUser {
    return this.players[this.players.length - 2].user;
  }

  get presidentTraded(): boolean {
    return this.game.presidentTraded;
  }

  get vicePresidentTraded(): boolean {
    return this.game.vicePresidentTraded;
  }

  get playerFinishOrder(): CardlyUser[] {
    return this.game.finishOrderIds.map((id) => this.players.find((player) => player.user.id === id).user);
  }

  constructor(private playIconService: PlayIconRegistryService) {
    this.playIconService.registerIcons([localParking, emojiEvents, cardlyScore, cardlyPlayingCards]);
  }
}

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
import {
  Card,
  CardlyUser,
  ScumDiscardPile,
  ScumGamePhase,
  ScumGameUI,
  ScumPlayerUI,
  ScumRank,
} from '@playground/cardly-util';
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
  @Input() game: ScumGameUI;
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

  get players(): { [userId: string]: ScumPlayerUI } {
    return this.game.players;
  }

  get sortedPlayersByTurnOrder(): ScumPlayerUI[] {
    return Object.values(this.players).sort((a, b) => a.turnOrder - b.turnOrder);
  }

  get sortedPlayersByFinishOrder(): ScumPlayerUI[] {
    return Object.values(this.players).sort((a, b) => a.finishOrder - b.finishOrder);
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

  get discardPile(): ScumDiscardPile[] {
    return this.game.discardPile;
  }

  get requiredDiscardSize(): number {
    return this.game.requiredDiscardSize;
  }

  get numOfCardsRequiredToPlay(): number {
    return this.game.requiredDiscardSize;
  }

  get president(): ScumPlayerUI {
    return this.sortedPlayersByTurnOrder.find((player) => player.turnOrder === 1);
  }

  get vicePresident(): ScumPlayerUI {
    return this.sortedPlayersByTurnOrder.find((player) => player.turnOrder === 2);
  }

  get scum(): ScumPlayerUI {
    return this.sortedPlayersByTurnOrder.find(
      (player) => player.turnOrder === this.sortedPlayersByTurnOrder.length - 1,
    );
  }

  get viceScum(): ScumPlayerUI {
    return this.sortedPlayersByTurnOrder.find(
      (player) => player.turnOrder === this.sortedPlayersByTurnOrder.length - 2,
    );
  }

  get presidentTraded(): boolean {
    return this.game.presidentTraded;
  }

  get vicePresidentTraded(): boolean {
    return this.game.vicePresidentTraded;
  }

  get lastUserToDiscardId(): string {
    return this.discardPile[this.discardPile.length - 1]?.userId;
  }

  constructor(private playIconService: PlayIconRegistryService) {
    this.playIconService.registerIcons([localParking, emojiEvents, cardlyScore, cardlyPlayingCards]);
  }
}

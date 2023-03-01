import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Card,
  CardlyUser,
  ScumGame,
  ScumGameState,
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
import { MePipe } from '../../shared/pipes/me.pipe';
import { DisableStagedCardsConfirmBtnPipe } from '../../shared/pipes/disable-staged-cards-confirm-btn.pipe';
import { IsUsersTurnPipe } from '../../shared/pipes/is-users-turn.pipe';
import { DisableCardSwapConfirmBtnPipe } from '../../shared/pipes/disable-card-swap-confirm-btn.pipe';
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
    CommonModule,
    CardlyPlayingCardComponent,
    PlayButtonComponent,
    PlayButtonGroupComponent,
    MePipe,
    DisableStagedCardsConfirmBtnPipe,
    DisableCardSwapConfirmBtnPipe,
    IsUsersTurnPipe,
    PlayButtonComponent,
    PlayButtonGroupComponent,
    PlayIconComponent,
  ],
})
export class ScumGameBoardComponent {
  GameState = ScumGameState;
  ScumRank = ScumRank;
  @HostBinding('class.scum-game-board') class = 'scum-game-board';
  @Input() game: ScumGame;
  @Input() user: CardlyUser;
  @Input() stagedCards: Card[];
  @Output() onSwipeLeft = new EventEmitter();
  @Output() onSwipeRight = new EventEmitter();
  @Output() startGame = new EventEmitter();
  @Output() passTurn = new EventEmitter();
  @Output() confirmSwapSelection = new EventEmitter();
  @Output() stageCard = new EventEmitter<number>();
  @Output() unstageCard = new EventEmitter<number>();
  @Output() confirmStagedCardsSelection = new EventEmitter();

  constructor(private playIconService: PlayIconRegistryService) {
    this.playIconService.registerIcons([
      localParking,
      emojiEvents,
      cardlyScore,
      cardlyPlayingCards,
    ]);
  }
}

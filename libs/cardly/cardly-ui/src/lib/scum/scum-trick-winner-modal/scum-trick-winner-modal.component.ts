import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Card } from '@playground/cardly-util';
import { CardlyPlayingCardComponent } from '../../shared/components/cardly-playing-card/cardly-playing-card.component';

@Component({
  selector: 'scum-trick-winner-modal',
  templateUrl: 'scum-trick-winner-modal.component.html',
  styleUrls: ['./scum-trick-winner-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardlyPlayingCardComponent],
})
export class ScumTrickWinnerComponent {
  constructor(@Inject(DIALOG_DATA) public data: { winner: string; cards: Card[] }) {}
}

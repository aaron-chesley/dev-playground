import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'play-card',
  templateUrl: './play-card.component.html',
  styleUrls: ['./play-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayCardComponent {}

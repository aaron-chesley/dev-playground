import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'play-card-header',
  templateUrl: './play-card-header.component.html',
  styleUrls: ['./play-card-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayCardHeaderComponent {}

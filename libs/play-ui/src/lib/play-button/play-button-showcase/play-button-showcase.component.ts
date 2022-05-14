import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'play-button-showcase',
  templateUrl: './play-button-showcase.component.html',
  styleUrls: ['./play-button-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayButtonShowcaseComponent {}

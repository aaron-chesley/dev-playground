import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'play-checkbox-showcase',
  templateUrl: './play-checkbox-showcase.component.html',
  styleUrls: ['./play-checkbox-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayCheckboxShowcaseComponent {}

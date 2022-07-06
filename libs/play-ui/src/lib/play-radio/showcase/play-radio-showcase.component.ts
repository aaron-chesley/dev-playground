import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'play-radio-showcase',
  templateUrl: './play-radio-showcase.component.html',
  styleUrls: ['./play-radio-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayRadioShowcaseComponent {
  selectedValue: any = 0;
  onPlayRadioChange(val: any) {
    this.selectedValue = val;
  }
}

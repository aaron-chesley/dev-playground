import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayRadioGroupComponent } from '../play-radio-group.component';
import { PlayRadioComponent } from '../play-radio.component';

@Component({
  selector: 'play-radio-showcase',
  templateUrl: './play-radio-showcase.component.html',
  styleUrls: ['./play-radio-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PlayRadioComponent, PlayRadioGroupComponent],
})
export class PlayRadioShowcaseComponent {
  showLastOne = false;
  selectedValue1 = '1';
  onPlayRadio1Change(val: any) {
    this.selectedValue1 = val;
  }

  selectedValue2 = '2';
  onPlayRadio2Change(val: any) {
    this.selectedValue2 = val;
  }
}

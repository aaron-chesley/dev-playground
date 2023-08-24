import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayRadioGroupComponent } from '../play-radio-group.component';
import { PlayRadioComponent } from '../play-radio.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'play-radio-showcase',
  templateUrl: './play-radio-showcase.component.html',
  styleUrls: ['./play-radio-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, PlayRadioComponent, PlayRadioGroupComponent],
})
export class PlayRadioShowcaseComponent {
  showLastOne = false;
  selectedValue1 = '1';
  selectedValue2 = '2';

  options = ['1', '2', '3'];
  radioFormControl = new FormControl(this.options[0]);

  onPlayRadio1Change(val: any) {
    this.selectedValue1 = val;
  }

  onPlayRadio2Change(val: any) {
    this.selectedValue2 = val;
  }

  constructor() {
    setTimeout(() => {
      console.log('radio form control value', this.radioFormControl.value);
    }, 7000);
  }
}

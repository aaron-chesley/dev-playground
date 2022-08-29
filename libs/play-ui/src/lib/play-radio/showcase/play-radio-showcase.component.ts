import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayRadioGroupComponent } from '../play-radio-group.component';
import { PlayRadioComponent } from '../play-radio.component';

@Component({
  selector: 'play-radio-showcase',
  templateUrl: './play-radio-showcase.component.html',
  styleUrls: ['./play-radio-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PlayRadioComponent, PlayRadioGroupComponent],
})
export class PlayRadioShowcaseComponent {
  selectedValue = 2;
  onPlayRadioChange(val: any) {
    this.selectedValue = val;
  }
}

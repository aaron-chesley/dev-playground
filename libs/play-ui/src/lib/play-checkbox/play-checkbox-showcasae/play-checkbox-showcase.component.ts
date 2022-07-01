import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LabelPosition } from '../play-checkbox.component';

@Component({
  selector: 'play-checkbox-showcase',
  templateUrl: './play-checkbox-showcase.component.html',
  styleUrls: ['./play-checkbox-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayCheckboxShowcaseComponent {
  @Input() label = '';
  @Input() labelPosition: LabelPosition = 'after';
  @Input() checked = false;
  @Input() disabled = false;

  onCheckboxChange($event: boolean) {
    this.checked = $event;
  }
}

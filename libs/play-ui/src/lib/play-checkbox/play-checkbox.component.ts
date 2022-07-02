import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { LabelPosition } from '../label-position.type';

@Component({
  selector: 'play-checkbox',
  templateUrl: './play-checkbox.component.html',
  styleUrls: ['./play-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayCheckboxComponent {
  @HostBinding('class') className = 'play-checkbox';

  @Input() checked = false;
  @Input() disabled = false;
  @Input() set labelPosition(labelPosition: LabelPosition) {
    if (labelPosition === 'after') {
      this._labelPosition = 'row';
    } else if (labelPosition === 'before') {
      this._labelPosition = 'row-reverse';
    }
  }

  @Output() playCheckboxChange = new EventEmitter<boolean>();

  _labelPosition: 'row' | 'row-reverse' = 'row';
  _uniqueId = self.crypto.randomUUID();

  onChange(event: Event) {
    this.playCheckboxChange.emit((event.target as HTMLInputElement).checked);
  }
}

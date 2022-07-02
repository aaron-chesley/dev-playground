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
  selector: 'play-toggle',
  templateUrl: './play-toggle.component.html',
  styleUrls: ['./play-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayToggleComponent {
  @HostBinding('class') className = 'play-toggle';

  @Input() checked = false;
  @Input() disabled = false;
  @Input() set labelPosition(labelPosition: LabelPosition) {
    if (labelPosition === 'after') {
      this._labelPosition = 'row';
    } else if (labelPosition === 'before') {
      this._labelPosition = 'row-reverse';
    }
  }

  @Output() playRadioChange = new EventEmitter<boolean>();

  _labelPosition: 'row' | 'row-reverse' = 'row';
  _uniqueId = self.crypto.randomUUID();

  onChange(event: Event) {
    this.playRadioChange.emit((event.target as HTMLInputElement).checked);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { getLabelPosition, LabelPosition } from '../label-position.type';

@Component({
  selector: 'play-radio',
  templateUrl: './play-radio.component.html',
  styleUrls: ['./play-radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class PlayRadioComponent {
  @HostBinding('class') className = 'play-radio';

  @Input() value: unknown;
  @Input() id = uuidv4();
  @Input() disabled = false;
  @Input() set labelPosition(labelPosition: LabelPosition) {
    this._labelPosition = getLabelPosition(labelPosition);
  }

  _playValueChange = new EventEmitter<unknown>();
  _labelPosition = 'row';
  _name = '';
  _selectedValue: unknown;

  onCheckChange(event: Event) {
    this._playValueChange.emit((event.target as HTMLInputElement).value);
  }
}

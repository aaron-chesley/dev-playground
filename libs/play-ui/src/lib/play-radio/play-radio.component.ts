import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
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
  imports: [CommonModule],
})
export class PlayRadioComponent {
  @HostBinding('class') className = 'play-radio';

  @Input() name = uuidv4();
  @Input() set labelPosition(labelPosition: LabelPosition) {
    this._labelPosition = getLabelPosition(labelPosition);
  }
  @Input() checked = false;
  @Input() disabled = false;
  @Input() value: unknown;
  @Output() playValueChange = new EventEmitter<unknown>();

  _labelPosition = 'row';
  _uniqueId = uuidv4();

  onCheckChange(event: Event) {
    this.playValueChange.emit((event.target as HTMLInputElement).value);
  }
}

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
    selector: 'play-toggle',
    templateUrl: './play-toggle.component.html',
    styleUrls: ['./play-toggle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule]
})
export class PlayToggleComponent {
  @HostBinding('class') className = 'play-toggle';
  @Input() set labelPosition(labelPosition: LabelPosition) {
    this._labelPosition = getLabelPosition(labelPosition);
  }
  @Input() checked = false;
  @Input() disabled = false;
  @Output() playCheckChange = new EventEmitter<boolean>();

  _labelPosition = 'row';
  _uniqueId = uuidv4();

  onCheckChange(event: Event) {
    this.playCheckChange.emit((event.target as HTMLInputElement).checked);
  }
}

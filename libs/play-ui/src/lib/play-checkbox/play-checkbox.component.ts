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
import { getLabelPosition, LabelPosition } from '../label-position.type';

@Component({
  selector: 'play-checkbox',
  templateUrl: './play-checkbox.component.html',
  styleUrls: ['./play-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class PlayCheckboxComponent {
  @HostBinding('class') className = 'play-checkbox';
  @Input() set labelPosition(labelPosition: LabelPosition) {
    this._labelPosition = getLabelPosition(labelPosition);
  }
  @Input() checked = false;
  @Input() disabled = false;
  @Output() playCheckChange = new EventEmitter<boolean>();

  _labelPosition = 'row';
  _uniqueId = self.crypto.randomUUID();

  onCheckChange(event: Event) {
    this.playCheckChange.emit((event.target as HTMLInputElement).checked);
  }
}

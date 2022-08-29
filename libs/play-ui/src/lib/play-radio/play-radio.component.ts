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
import { LabelPositionBase } from '../mixins/input';

const PlayRadio = LabelPositionBase();

@Component({
  selector: 'play-radio',
  templateUrl: './play-radio.component.html',
  styleUrls: ['./play-radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class PlayRadioComponent extends PlayRadio {
  @HostBinding('class') className = 'play-radio';

  @Input() name = self.crypto.randomUUID();
  @Input() checked = false;
  @Input() disabled = false;
  @Input() value: unknown;
  @Output() playValueChange = new EventEmitter<unknown>();

  onCheckChange(event: Event) {
    this.playValueChange.emit((event.target as HTMLInputElement).value);
  }
}

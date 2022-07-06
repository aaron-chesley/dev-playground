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
})
export class PlayRadioComponent extends PlayRadio {
  @HostBinding('class') className = 'play-radio';

  @Input() name = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() value: any;
  @Output() playValueChange = new EventEmitter<any>();

  onCheckChange(event: Event) {
    this.playValueChange.emit((event.target as HTMLInputElement).value);
  }
}

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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { getLabelPosition, LabelPosition } from '../label-position.type';

@Component({
  selector: 'play-checkbox',
  templateUrl: './play-checkbox.component.html',
  styleUrls: ['./play-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PlayCheckboxComponent,
      multi: true,
    },
  ],
})
export class PlayCheckboxComponent implements ControlValueAccessor {
  @HostBinding('class') className = 'play-checkbox';
  @Input() set labelPosition(labelPosition: LabelPosition) {
    this._labelPosition = getLabelPosition(labelPosition);
  }
  @Input() checked = false;
  @Input() disabled = false;
  @Output() playCheckChange = new EventEmitter<boolean>();

  _labelPosition = 'row';
  _uniqueId = uuidv4();

  onChange: any = () => {};
  onTouched: any = () => {};
  set value(val: boolean) {
    this.checked = val;
    this.onChange(val);
    this.onTouched(val);
  }

  writeValue(value: boolean): void {
    this.value = value;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: Function): void {
    this.onTouched = onTouched;
  }

  onCheckChange(event: Event) {
    const value = (event.target as HTMLInputElement).checked;
    this.onChange(value);
    this.playCheckChange.emit((event.target as HTMLInputElement).checked);
  }
}

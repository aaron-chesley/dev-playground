import { EventEmitter, Input, Output } from '@angular/core';
import { Constructor } from '../constructor.type';

interface CheckedBase {
  checked: boolean;
  playCheckChange: EventEmitter<boolean>;
  onCheckChange: (event: Event) => void;
}

export function CheckedBase<TBase extends Constructor>(
  Base: TBase = class {} as any
) {
  class CheckedBase extends Base implements CheckedBase {
    @Input() checked = false;
    @Output() playCheckChange = new EventEmitter<boolean>;

    onCheckChange(event: Event) {
      this.playCheckChange.emit((event.target as HTMLInputElement).checked);
    }
  }

  return CheckedBase;
}

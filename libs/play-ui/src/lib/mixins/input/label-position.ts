import { Input } from '@angular/core';
import { Constructor } from '../constructor.type';

export type LabelPosition = 'before' | 'after';

interface LabelPositionBase {
  labelPosition: LabelPosition;
  _labelPosition: 'row' | 'row-reverse';
  _uniqueId: string;
}

export function LabelPositionBase<TBase extends Constructor>(
  Base: TBase = class {} as any
) {
  class LabelPositionBase extends Base implements LabelPositionBase {
    @Input() set labelPosition(labelPosition: LabelPosition) {
      if (labelPosition === 'after') {
        this._labelPosition = 'row';
      } else if (labelPosition === 'before') {
        this._labelPosition = 'row-reverse';
      }
    }
    _labelPosition: 'row' | 'row-reverse' = 'row';
    _uniqueId = self.crypto.randomUUID();
  }

  return LabelPositionBase;
}

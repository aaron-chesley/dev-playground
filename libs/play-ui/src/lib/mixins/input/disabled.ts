import { Injectable, Input } from '@angular/core';
import { Constructor } from '../constructor.type';

interface DisabledBase {
  disabled: boolean;
}

export function DisabledBase<TBase extends Constructor>(
  Base: TBase = class {} as any
) {
  @Injectable()
  class DisabledBase extends Base implements DisabledBase {
    @Input() disabled = false;
  }

  return DisabledBase;
}

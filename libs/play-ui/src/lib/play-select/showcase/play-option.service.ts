import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Injectable } from '@angular/core';

@Injectable()
export class PlayOptionService {
  selection: SelectionModel<any>;
  allowMultiple = false;

  toggleSelection(value: any | any[]) {
    if (this.allowMultiple) {
      this.selection.toggle(value);
    } else {
      this.selection.setSelection(value);
    }

    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.selection = new SelectionModel<any>(true, []);
  }
}

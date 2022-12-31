import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayRadioGroupService {
  private radiogGroupNameSub = new BehaviorSubject<string>(uuidv4());

  private selectedValueSub = new BehaviorSubject<unknown>(undefined);

  setSelectedValue(nextValue: unknown) {
    const currentValue = this.selectedValueSub.getValue();
    if (currentValue !== nextValue) {
      this.selectedValueSub.next(nextValue);
    }
  }
  getSelectedValue(): Observable<unknown> {
    return this.selectedValueSub.asObservable();
  }

  setRadioGroupName(value: string) {
    this.radiogGroupNameSub.next(value);
  }
  getRadioGroupName(): Observable<string> {
    return this.radiogGroupNameSub.asObservable();
  }
}

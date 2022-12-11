import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { PlayRadioComponent } from './play-radio.component';

@Component({
  selector: 'play-radio-group',
  template: ` <ng-content select="play-radio"></ng-content> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class PlayRadioGroupComponent implements AfterContentInit, OnDestroy {
  @HostBinding('class') className = 'play-radio-group';
  @ContentChildren(PlayRadioComponent)
  playRadioButtons: QueryList<PlayRadioComponent> = new QueryList();

  @Input() value: unknown;
  @Input() name = uuidv4();
  @Input() disabled = false;
  @Output() playRadioChange = new EventEmitter<unknown>();

  private $ngDestroy = new Subject<void>();

  ngAfterContentInit() {
    this.playRadioButtons.forEach((btn) => {
      btn._name = this.name;
      btn._selectedValue = this.value;
    });

    merge(...this.playRadioButtons.map((btn) => btn._playValueChange))
      .pipe(takeUntil(this.$ngDestroy))
      .subscribe((value) => {
        this.playRadioChange.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.$ngDestroy.next();
    this.$ngDestroy.complete();
  }
}

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
import { DisabledBase } from '../mixins/input';
import { PlayRadioComponent } from './play-radio.component';

const PlayRadioGroup = DisabledBase();

@Component({
  selector: 'play-radio-group',
  template: ` <ng-content select="play-radio"></ng-content> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayRadioGroupComponent
  extends PlayRadioGroup
  implements AfterContentInit, OnDestroy
{
  static id = 0;
  @HostBinding('class') className = 'play-radio-group';
  @ContentChildren(PlayRadioComponent)
  playRadioButtons: QueryList<PlayRadioComponent> = new QueryList();

  @Input() value: any;
  @Input() name = self.crypto.randomUUID();
  @Output() playRadioChange = new EventEmitter<any>();

  $ngDestroy = new Subject();

  get id(): number {
    return PlayRadioGroupComponent.id;
  }

  ngAfterContentInit() {
    this.playRadioButtons.forEach((btn) => (btn.name = this.name));

    merge(...this.playRadioButtons.map((btn) => btn.playValueChange))
      .pipe(takeUntil(this.$ngDestroy))
      .subscribe((value) => {
        this.playRadioChange.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.$ngDestroy.next();
    this.$ngDestroy.complete();
  }

  constructor() {
    super();
    PlayRadioGroupComponent.id++;
  }
}

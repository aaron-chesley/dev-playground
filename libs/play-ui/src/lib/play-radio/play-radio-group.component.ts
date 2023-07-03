import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PlayRadioGroupService } from './play-radio-group.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'play-radio-group',
  template: ` <ng-content select="play-radio"></ng-content> `,
  styles: [
    `
      .play-radio-group {
        display: inline-flex;
        flex-direction: column;
        font-size: 1rem;
        gap: 5px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [
    PlayRadioGroupService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PlayRadioGroupComponent,
      multi: true,
    },
  ],
})
export class PlayRadioGroupComponent
  implements OnChanges, OnDestroy, ControlValueAccessor
{
  @HostBinding('class') className = 'play-radio-group';

  @Input() value: unknown;
  @Input() name: string;
  @Input() disabled = false;
  @Output() playRadioChange = new EventEmitter<unknown>();

  private $ngDestroy = new Subject<void>();

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: unknown): void {
    this.value = value;
    this.radioService.setSelectedValue(value);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.radioService.setSelectedValue(changes.value.currentValue);
    }
    if (changes.name) {
      this.radioService.setRadioGroupName(changes.name.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.$ngDestroy.next();
    this.$ngDestroy.complete();
  }

  constructor(private radioService: PlayRadioGroupService) {
    this.radioService
      .getSelectedValue()
      .pipe(takeUntil(this.$ngDestroy))
      .subscribe((value) => {
        this.onChange(value);
        this.playRadioChange.emit(value);
      });
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'play-counter',
  template: `
    <div class="play-counter">
      <button class="play-counter-btn" (click)="onRemove()">&minus;</button>
      <div class="play-counter-quantity">{{ quantity }}</div>
      <button class="play-counter-btn" (click)="onAdd()">&plus;</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PlayCounterComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PlayCounterComponent,
    },
  ],
})
export class PlayCounterComponent implements ControlValueAccessor, Validator {
  quantity = 0;
  @Input() increment = 1;

  touched = false;

  disabled = false;

  onAdd() {
    this.markAsTouched();
    if (!this.disabled) {
      this.quantity += this.increment;
      this.onChange(this.quantity);
    }
  }

  onRemove() {
    this.markAsTouched();
    if (!this.disabled) {
      this.quantity -= this.increment;
      this.onChange(this.quantity);
    }
  }

  // eslint-disable-next-line
  // @ts-ignore
  onChange = (quantity) => ({});

  onTouched = () => ({});

  writeValue(quantity: number) {
    this.quantity = quantity;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  // eslint-disable-next-line
  // @ts-ignore
  validate(control: AbstractControl): ValidationErrors | null {
    const quantity = control.value;
    if (quantity < 0) {
      return {
        mustBePositive: {
          quantity,
        },
      };
    }
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
  HostBinding,
  ElementRef,
  OnInit,
  inject,
  DestroyRef,
  ContentChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SelectionModel } from '@angular/cdk/collections';
import { PlayCheckboxComponent } from '../play-checkbox/play-checkbox.component';

@Component({
  selector: 'play-select',
  templateUrl: './play-select.component.html',
  styleUrls: ['./play-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, OverlayModule, PlayCheckboxComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PlaySelectComponent,
      multi: true,
    },
  ],
})
export class PlaySelectComponent implements OnInit, ControlValueAccessor {
  @Input() value: any = null;
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() multiple = false;
  @Input() options: any[] = [];
  @Output() playSelectChange = new EventEmitter<any>();

  isOpen = false;
  selection: SelectionModel<any> = new SelectionModel<any>(true, []);
  destroyRef = inject(DestroyRef);

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  @HostBinding('class') className = 'play-select';
  @HostBinding('class.open') get isOpenClass() {
    return this.isOpen;
  }
  @HostBinding('class.disabled') get disabledClass() {
    return this.disabled;
  }
  @HostListener('click', ['$event']) click() {
    this.isOpen = !this.isOpen;
  }
  @HostListener('focusout', ['$event.target.value'])
  onFocusout() {
    setTimeout(() => {
      this.onTouched();
    });
  }

  get label(): string {
    if (this.multiple) {
      return `${this.selection.selected.length} selected`;
    }
    return this.selection.selected[0];
  }

  ngOnInit() {
    if (this.value !== null && this.value !== undefined) {
      this.toggleOption(this.value);
    }

    this.selection.changed
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((a) => {
        this.onChange(this.selection.selected);
        this.playSelectChange.emit(this.selection.selected);
        if (!this.multiple) {
          this.isOpen = false;
        }
      });
  }

  onChange: any = () => ({});
  onTouched: any = () => ({});

  writeValue(value: any): void {
    this.toggleOption(value);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  toggleOption(option: any) {
    if (this.multiple) {
      this.selection.toggle(option);
    } else {
      this.selection.setSelection(option);
    }
  }

  constructor(public elRef: ElementRef<HTMLElement>) {}
}

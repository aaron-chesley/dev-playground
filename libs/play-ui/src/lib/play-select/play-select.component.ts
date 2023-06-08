import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
  HostBinding,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
  inject,
  DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlayOptionService } from './showcase/play-option.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'play-select',
  templateUrl: './play-select.component.html',
  styleUrls: ['./play-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, OverlayModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PlaySelectComponent,
      multi: true,
    },
    PlayOptionService,
  ],
})
export class PlaySelectComponent implements OnInit, ControlValueAccessor {
  @Input() value: any = null;
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() multiple = false;
  @Output() playSelectChange = new EventEmitter<any>();
  isOpen = false;
  selection: SelectionModel<unknown>;
  destroyRef = inject(DestroyRef);

  @HostBinding('class.open') get isOpenClass() {
    return this.isOpen;
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

  ngOnInit() {
    this.selection = this.playOptionService.selection;
    this.playOptionService.allowMultiple = this.multiple;
    if (this.value !== null && this.value !== undefined) {
      this.playOptionService.toggleSelection(this.value);
    }
    this.selection.changed
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((a) => {
        this.valueChanged(this.selection.selected);
      });
  }

  onChange: any = () => ({});
  onTouched: any = () => ({});

  writeValue(value: any): void {
    this.playOptionService.toggleSelection(value);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  valueChanged(value: any[]) {
    this.onChange(value);
    this.playSelectChange.emit(value);
    if (!this.multiple) {
      this.isOpen = false;
    }
    this.cdr.detectChanges();
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.elRef.nativeElement.classList.add('disabled');
    } else {
      this.elRef.nativeElement.classList.remove('disabled');
    }
    this.disabled = isDisabled;
  }

  constructor(
    public elRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private playOptionService: PlayOptionService
  ) {}
}

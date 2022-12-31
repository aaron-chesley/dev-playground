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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlayIconRegistryService } from '../play-icon/play-icon-registry.service';
import { PlayIconComponent } from '../play-icon/play-icon.component';
import { arrowDropDown } from '../play-icon/play-icons';

@Component({
  selector: 'play-select',
  templateUrl: './play-select.component.html',
  styleUrls: ['./play-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, OverlayModule, PlayIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PlaySelectComponent,
      multi: true,
    },
  ],
})
export class PlaySelectComponent implements ControlValueAccessor {
  @Input() value: any;
  @Input() disabled = false;
  @Output() playSelectChange = new EventEmitter<any>();
  isOpen = false;

  @HostBinding('class.open') get isOpenClass() {
    return this.isOpen;
  }

  @HostListener('click', ['$event']) click() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('focusout', ['$event.target.value'])
  onFocusout() {
    setTimeout(() => this.onTouched());
  }

  onChange: any = () => ({});
  onTouched: any = () => ({});

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  valueChanged(value: any) {
    this.onChange(value);
    this.value = value;
    this.playSelectChange.emit(value);
    this.isOpen = false;
    this.cdr.detectChanges();
  }

  constructor(
    private iconService: PlayIconRegistryService,
    public elRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef
  ) {
    this.iconService.registerIcons([arrowDropDown]);
  }
}

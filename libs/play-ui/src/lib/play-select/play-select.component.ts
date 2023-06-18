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
  ViewChildren,
  QueryList,
  ViewChild,
  Inject,
} from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet, DOCUMENT } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { SelectionModel } from '@angular/cdk/collections';
import { shareReplay } from 'rxjs/operators';
import { PlayCheckboxComponent } from '../play-checkbox/play-checkbox.component';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { PlayInputTextComponent } from '../play-input-text/play-input-text.component';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { A11yModule } from '@angular/cdk/a11y';

const isValidHtmlInputValue = (event: KeyboardEvent): boolean => {
  const key = event.key;
  const validHtmlInputValuesRegex =
    /^(?=.{1}$)[a-zA-Z0-9\s\-_"'.,:;!?()@#$%^&*+=<>{}\[\]\\/]$/;
  return (
    validHtmlInputValuesRegex.test(key) || key === 'Backspace' || key === ' '
  );
};

@Component({
  selector: 'play-select',
  templateUrl: './play-select.component.html',
  styleUrls: ['./play-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    NgIf,
    ReactiveFormsModule,
    OverlayModule,
    A11yModule,
    ScrollingModule,
    PlayCheckboxComponent,
    PlayInputTextComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PlaySelectComponent,
      multi: true,
    },
  ],
})
export class PlaySelectComponent implements OnInit, ControlValueAccessor {
  isOpen = false;
  selection: SelectionModel<any> = new SelectionModel<any>(true, []);
  searchCtrl = new FormControl('');
  filteredOptions$: Observable<any[]>;
  viewportHeight$: Observable<number>;
  isFocused = false;

  @Input() value: any = null;
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() multiple = false;
  @Input() options: any[] = [];
  @Input() itemSize = 29.2;
  @Input() maxViewportHeight = 200;
  @Input() showSearch = false;
  @Input() filterFn = (option: any, searchTerm: string) => {
    return option.toLowerCase().includes(searchTerm.toLowerCase());
  };
  @Input() searchDebounceTime = 300;
  @Output() playSelectChange = new EventEmitter<any>();

  @ContentChild(TemplateRef) template: TemplateRef<any>;
  @ViewChild('overlayTemplate', { static: true }) overlayTemplate: OverlayRef;
  @ViewChild('virtualScrollViewport', { static: false })
  virtualScrollViewport: CdkVirtualScrollViewport;
  @ViewChild('visibleScrollViewport', { static: false })
  visibleScrollViewport: ElementRef<HTMLElement>;
  @ViewChildren('listOptionRefs') listOptionRefs: QueryList<
    ElementRef<HTMLElement>
  >;

  @HostBinding('class') className = 'play-select';
  @HostBinding('class.open') get isOpenClass() {
    return this.isOpen;
  }
  @HostBinding('class.disabled') get disabledClass() {
    return this.disabled;
  }
  @HostListener('click')
  @HostListener('window:keydown.enter')
  @HostListener('window:keydown.space')
  click() {
    if (this.isFocused) {
      this.isOpen = !this.isOpen;
    }
  }
  @HostListener('focusin') onFocusin() {
    this.isFocused = true;
  }

  @HostListener('focusout')
  onFocusout() {
    this.isFocused = false;
    setTimeout(() => {
      this.onTouched();
    });
  }
  @HostListener('window:keydown.tab') onTab() {
    this.isOpen = false;
  }

  get label(): string {
    if (this.multiple) {
      return `${this.selection.selected.length} selected`;
    }
    return this.selection.selected[0];
  }

  ngOnInit() {
    if (this.value !== undefined && this.value !== null) {
      this.toggleOption(this.value);
    }

    this.filteredOptions$ = this.searchCtrl.valueChanges.pipe(
      debounceTime(this.searchDebounceTime),
      startWith(''),
      map((value) => {
        if (value) {
          return this.options.filter((option) => this.filterFn(option, value));
        }
        return this.options;
      }),
      shareReplay(1)
    );

    this.viewportHeight$ = this.filteredOptions$.pipe(
      map((options) => {
        const margin = 1;
        const padding = 10;
        // parseFloat(getComputedStyle(parentElement).fontSize);
        const height = options.length * this.itemSize;
        return height + margin + padding > this.maxViewportHeight
          ? this.maxViewportHeight
          : height + margin + padding;
      })
    );
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
      this.isOpen = false;
    }
    this.onChange(this.selection.selected);
    this.playSelectChange.emit(this.selection.selected);
  }

  onOverlayAttach() {
    setTimeout(() => {
      this.listOptionRefs.first.nativeElement.focus();
    });
  }

  onOverlayKeydown(event: KeyboardEvent) {
    if (isValidHtmlInputValue(event)) {
      return;
    }

    if (event.key === 'ArrowDown') {
      this.focusNextOption();
    } else if (event.key === 'ArrowUp') {
      this.focusPreviousOption();
    } else if (event.key === 'Enter' || event.key === ' ') {
      const index: number = parseInt(
        this.document.activeElement.getAttribute('index')
      );
      if (index >= 0) {
        this.toggleOption(this.options[index]);
      }
    }
    event.preventDefault();
  }

  private focusNextOption() {
    if (
      this.visibleScrollViewport.nativeElement.contains(
        this.document.activeElement
      )
    ) {
      const nextElement = this.document.activeElement
        .nextElementSibling as HTMLElement;
      if (nextElement) {
        nextElement.focus();
      } else {
        this.virtualScrollViewport.scrollToIndex(0);
      }
    } else {
      (
        this.visibleScrollViewport.nativeElement
          .firstElementChild as HTMLElement
      ).focus();
    }
  }

  private focusPreviousOption() {
    if (
      this.visibleScrollViewport.nativeElement.contains(
        this.document.activeElement
      )
    ) {
      const previousElement = this.document.activeElement
        .previousElementSibling as HTMLElement;
      if (previousElement) {
        previousElement.focus();
      } else {
        this.virtualScrollViewport.scrollToIndex(this.options.length - 1);
      }
    } else {
      (
        this.visibleScrollViewport.nativeElement.lastElementChild as HTMLElement
      ).focus();
    }
  }

  constructor(
    public elRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document
  ) {}
}

import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { PlayCheckboxComponent } from '../play-checkbox/play-checkbox.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'play-select-option',
  templateUrl: './play-select-option.component.html',
  styleUrls: ['./play-select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgTemplateOutlet, NgIf, PlayCheckboxComponent],
})
export class PlaySelectOptionComponent {
  @Input() value: any;
  multiple = true;

  @HostBinding('class') className = 'play-select-option';
  @HostBinding('class.play-select-option-active') get activeClass() {
    return false;
    // return this.playSelect.value === this.value;
  }
  @HostListener('click', ['$event']) onClick() {
    // this.playSelect.writeValue(this.value);
    // this.playSelect.playSelectChange.emit(this.value);
    // this.playSelect.isOpen = false;
    // this.playSelect.valueChanged(this.value);
  }

  constructor() {}
}

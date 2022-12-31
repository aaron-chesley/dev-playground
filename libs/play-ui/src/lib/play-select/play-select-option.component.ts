import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaySelectComponent } from './play-select.component';

@Component({
  selector: 'play-select-option',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: inline-flex;
        padding: 5px;
        cursor: pointer;
        box-sizing: border-box;
      }
      :host:hover {
        background-color: var(--play-primary-color-lightest);
      }
      :host.play-select-option-active {
        background-color: var(--play-primary-color-lighter);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class PlaySelectOptionComponent {
  @Input() value: any;

  @HostBinding('class.play-select-option-active') get activeClass() {
    return this.playSelect.value === this.value;
  }
  @HostListener('click', ['$event']) onClick() {
    // this.playSelect.writeValue(this.value);
    // this.playSelect.playSelectChange.emit(this.value);
    // this.playSelect.isOpen = false;
    this.playSelect.valueChanged(this.value);
  }

  constructor(private playSelect: PlaySelectComponent) {}
}

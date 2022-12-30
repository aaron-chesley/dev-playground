import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
        background-color: orange;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class PlaySelectOptionComponent {}

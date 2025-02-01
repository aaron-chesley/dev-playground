import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { PlayTextComponent } from '../play-typography/play-text/play-text.component';

@Component({
    selector: 'play-form-field-error',
    template: `<p playText [size]="6">*<ng-content></ng-content></p>`,
    styles: [
        `
      .play-form-field-error {
        color: var(--play-error-color);
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [PlayTextComponent]
})
export class PlayFormFieldErrorComponent {
  @HostBinding('class') className = 'play-form-field-error';
}

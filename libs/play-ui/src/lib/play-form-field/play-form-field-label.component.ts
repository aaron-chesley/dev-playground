import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { PlayTextComponent } from '../play-typography/play-text/play-text.component';

@Component({
  selector: 'play-form-field-label',
  template: `<p playText [size]="4"><ng-content></ng-content></p>`,
  styles: [
    `
      .play-form-field-label {
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PlayTextComponent],
})
export class PlayFormFieldLabelComponent {
  @HostBinding('class') className = 'play-form-field-label';
}

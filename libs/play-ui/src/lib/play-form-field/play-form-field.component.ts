import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { PlayInputTextComponent } from '../play-input-text/play-input-text.component';

@Component({
    selector: 'play-form-field',
    templateUrl: './play-form-field.component.html',
    styleUrls: ['./play-form-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: []
})
export class PlayFormFieldComponent {
  @HostBinding('class') get classes() {
    // We need to add the classes that angular places on the <input> to our <play-form-field> in order to add styling based on form control states.
    const ngClasses = this.contentChild.nativeElement.classList.value
      .split(' ')
      .reduce((classes, currentClass) => {
        if (!currentClass.startsWith('ng')) {
          return '';
        }
        return `${classes} ${currentClass}`;
      }, '');
    return 'play-form-field' + ngClasses;
  }
  @ContentChild(PlayInputTextComponent, { read: ElementRef })
  contentChild!: ElementRef<HTMLElement>;
}

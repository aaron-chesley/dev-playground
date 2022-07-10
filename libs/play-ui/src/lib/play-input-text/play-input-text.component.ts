import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[playInputText]',
  templateUrl: './play-input-text.component.html',
  styleUrls: ['./play-input-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayInputTextComponent {
  @HostBinding('class')
  className = 'play-input-text';
}

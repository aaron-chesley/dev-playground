import {
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { PlayTheme } from '../play-theme.type';
import { PlayButtonAppearance } from './play-button-appearance.type';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[playButton]',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayButtonComponent implements OnChanges {
  @HostBinding('class')
  className = '';

  @Input() appearance: PlayButtonAppearance = 'play-outline';

  @Input() theme: PlayTheme = 'primary';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appearance || changes.color) {
      this.className = `${this.appearance} ${this.theme}`;
    }
  }
}

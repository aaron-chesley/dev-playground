import {
  HostBinding,
  Input,
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  OnChanges,
} from '@angular/core';
import { PlayTheme } from '../play-theme/play-theme.type';
import { PlayButtonAppearance } from './play-button-appearance.type';
import {
  PlayButtonDefaultOptions,
  PLAY_BUTTON_DEFAULT_OPTIONS,
} from './play-button-default-options';
import { PlayRippleDirective } from '../play-ripple/play-ripple';

@Component({
  selector: 'button[playButton]',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [PlayRippleDirective],
  standalone: true,
  imports: [],
})
export class PlayButtonComponent implements OnChanges {
  @HostBinding('class') className = '';

  @Input() appearance: PlayButtonAppearance;
  @Input() theme: PlayTheme;

  ngOnChanges() {
    this.className = `${this.appearance} ${this.theme}`;
  }

  constructor(
    @Inject(PLAY_BUTTON_DEFAULT_OPTIONS) options: PlayButtonDefaultOptions
  ) {
    this.appearance = options.appearance;
    this.theme = options.theme;
  }
}

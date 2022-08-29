import {
  HostBinding,
  Input,
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayTheme } from '../play-theme/play-theme.type';
import { PlayButtonAppearance } from './play-button-appearance.type';
import {
  PlayButtonDefaultOptions,
  PLAY_BUTTON_DEFAULT_OPTIONS,
} from './play-button-default-options';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[playButton]',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class PlayButtonComponent implements OnChanges {
  @HostBinding('class')
  className = '';

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

import {
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PlayColor } from '../play-color.type';
import { PlayButtonAppearance } from './play-button-appearance.type';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[playButton]',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayButtonComponent implements OnChanges {
  @HostBinding('class')
  className = '';

  @Input() appearance: PlayButtonAppearance = 'outline';

  @Input() color: PlayColor = 'accent';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appearance || changes.color) {
      switch (this.appearance) {
        case 'flat':
          this.className = `play-btn play-btn-flat ${this.color}`;
          break;
        case 'outline':
          this.className = `play-btn play-btn-outline ${this.color}`;
          break;
        case 'fab':
          this.className = `play-btn-fab ${this.color}`;
          break;
        case 'icon':
          this.className = `play-btn-icon ${this.color}`;
          break;
        default:
          break;
      }
    }
  }
}

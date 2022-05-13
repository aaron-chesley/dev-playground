import {
  NgModule,
  Directive,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PlayColor } from '../play-color.type';
import { PlayButtonAppearance } from './play-button-appearance.type';

@Directive({ selector: '[playButton]' })
export class PlayButtonDirective implements OnChanges {
  @HostBinding('class')
  className = '';

  @Input() appearance: PlayButtonAppearance = 'outline';

  @Input() color: PlayColor = 'accent';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appearance || changes.color) {
      this.className = `play-button play-button-${this.appearance} ${this.color}`;
    }
  }
}

@NgModule({
  imports: [],
  declarations: [PlayButtonDirective],
  exports: [PlayButtonDirective],
  providers: [],
})
export class PlayButtonModule {}

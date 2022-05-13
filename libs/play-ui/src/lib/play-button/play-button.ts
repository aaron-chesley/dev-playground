import { NgModule, Directive, HostBinding, Input, OnInit } from '@angular/core';
import { PlayColor } from '../play-color.type';
import { PlayButtonAppearance } from './play-button-appearance.type';

@Directive({ selector: '[playButton]' })
export class PlayButtonDirective implements OnInit {
  @HostBinding('class')
  className = '';

  @Input() appearance: PlayButtonAppearance = 'outline';

  @Input() color: PlayColor = 'accent';

  ngOnInit() {
    this.className = `play-button play-button-${this.appearance} ${this.color}`;
  }
}

@NgModule({
  imports: [],
  declarations: [PlayButtonDirective],
  exports: [PlayButtonDirective],
  providers: [],
})
export class PlayButtonModule {}

// @Input()
//   set color(value: PlayColor) {
//     this.className = this.className += `play-button play-button-flat ${value}`;
//   }

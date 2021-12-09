import { NgModule, Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[playButtonFlat]' })
export class PlayButtonFlatDirective {
  @HostBinding('class')
  className = 'play-button play-button-flat';
}

@Directive({ selector: '[playButtonOutline]' })
export class PlayButtonOutlineDirective {
  @HostBinding('class')
  className = 'play-button play-button-outline';
}

@NgModule({
  imports: [],
  declarations: [PlayButtonFlatDirective, PlayButtonOutlineDirective],
  exports: [PlayButtonFlatDirective, PlayButtonOutlineDirective],
  providers: [],
})
export class PlayButtonModule {}

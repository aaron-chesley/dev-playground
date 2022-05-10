import { NgModule, Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({ selector: '[playButtonFlat]' })
export class PlayButtonFlatDirective implements OnInit {
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @HostBinding('class')
  className = '';

  ngOnInit() {
    this.className = `play-button play-button-flat ${this.color}`;
  }
}

@Directive({ selector: '[playButtonOutline]' })
export class PlayButtonOutlineDirective implements OnInit {
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @HostBinding('class')
  className = '';

  ngOnInit() {
    this.className = `play-button play-button-outline ${this.color}`;
  }
}

@NgModule({
  imports: [],
  declarations: [PlayButtonFlatDirective, PlayButtonOutlineDirective],
  exports: [PlayButtonFlatDirective, PlayButtonOutlineDirective],
  providers: [],
})
export class PlayButtonModule {}

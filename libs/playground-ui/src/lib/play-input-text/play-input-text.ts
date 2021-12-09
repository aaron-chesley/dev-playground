import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[playInputText]' })
export class PlayInputTextDirective {
  @HostBinding('class')
  className = 'play-input-text';
}

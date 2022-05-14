import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  home,
  PlayIconModule,
  PlayIconRegistryService,
} from '@dev-playground/play-icon';
import { PlayButtonModule } from '../play-button.module';

import { PlayButtonShowcaseComponent } from './play-button-showcase.component';

@NgModule({
  imports: [CommonModule, PlayButtonModule, PlayIconModule],
  exports: [PlayButtonShowcaseComponent],
  declarations: [PlayButtonShowcaseComponent],
  providers: [],
})
export class PlayButtonShowcaseModule {
  constructor(private iconService: PlayIconRegistryService) {
    this.iconService.registerIcons([home]);
  }
}

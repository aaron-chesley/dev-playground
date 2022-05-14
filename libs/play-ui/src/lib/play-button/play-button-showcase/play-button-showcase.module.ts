import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayIconRegistryService } from '../../play-icon/play-icon-registry.service';
import { PlayIconModule } from '../../play-icon/play-icon.module';
import { home } from '../../play-icon/play-icons';
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

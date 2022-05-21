import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayButtonModule } from '../../play-button/play-button.module';
import { PlayCardModule } from '../../play-card/play-card/play-card.module';
import { PlayModalAlertModule } from '../play-modal-alert/play-modal-alert.module';
import { PlayModalModule } from '../play-modal.module';

import { PlayModalShowcaseComponent } from './play-modal-showcase.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    PlayModalModule,
    PlayModalAlertModule,
    PlayCardModule,
    PlayButtonModule,
  ],
  exports: [PlayModalShowcaseComponent],
  declarations: [PlayModalShowcaseComponent],
  providers: [],
})
export class PlayModalShowcaseModule {}

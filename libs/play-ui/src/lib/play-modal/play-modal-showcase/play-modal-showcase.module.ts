import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayModalModule } from '../play-modal.module';

import { PlayModalShowcaseComponent } from './play-modal-showcase.component';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, PlayModalModule],
  exports: [PlayModalShowcaseComponent],
  declarations: [PlayModalShowcaseComponent],
  providers: [],
})
export class PlayModalShowcaseModule {}

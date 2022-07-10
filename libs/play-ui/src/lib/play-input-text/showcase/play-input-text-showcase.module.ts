import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayInputTextModule } from '../play-input-text.module';

import { PlayInputTextShowcaseComponent } from './play-input-text-showcase.component';

@NgModule({
  imports: [CommonModule, PlayInputTextModule],
  exports: [PlayInputTextShowcaseComponent],
  declarations: [PlayInputTextShowcaseComponent],
  providers: [],
})
export class PlayInputTextShowcaseModule {}

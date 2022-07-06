import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayRadioModule } from '../play-radio.module';
import { PlayRadioShowcaseComponent } from './play-radio-showcase.component';

@NgModule({
  imports: [CommonModule, PlayRadioModule],
  exports: [PlayRadioShowcaseComponent],
  declarations: [PlayRadioShowcaseComponent],
  providers: [],
})
export class PlayRadioShowcaseModule {}

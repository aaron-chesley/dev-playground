import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayRadioGroupComponent } from './play-radio-group.component';

import { PlayRadioComponent } from './play-radio.component';

@NgModule({
  imports: [CommonModule],
  exports: [PlayRadioGroupComponent, PlayRadioComponent],
  declarations: [PlayRadioGroupComponent, PlayRadioComponent],
  providers: [],
})
export class PlayRadioModule {}

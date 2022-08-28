import { NgModule } from '@angular/core';
import { PlayTextComponent } from '../play-text/play-text.component';

import { PlayTypographyShowcaseComponent } from './play-typography-showcase.component';

@NgModule({
  imports: [PlayTextComponent],
  exports: [PlayTypographyShowcaseComponent],
  declarations: [PlayTypographyShowcaseComponent],
  providers: [],
})
export class PlayTypographyShowcaseModule {}

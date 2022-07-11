import { NgModule } from '@angular/core';
import { PlayHeadingModule } from '../play-heading/play-heading.module';

import { PlayTypographyShowcaseComponent } from './play-typography-showcase.component';

@NgModule({
  imports: [PlayHeadingModule],
  exports: [PlayTypographyShowcaseComponent],
  declarations: [PlayTypographyShowcaseComponent],
  providers: [],
})
export class PlayTypographyShowcaseModule {}

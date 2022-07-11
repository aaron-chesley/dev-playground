import { NgModule } from '@angular/core';
import { PlayHeadingModule } from '../play-heading/play-heading.module';
import { PlayTextModule } from '../play-text/play-text.module';

import { PlayTypographyShowcaseComponent } from './play-typography-showcase.component';

@NgModule({
  imports: [PlayHeadingModule, PlayTextModule],
  exports: [PlayTypographyShowcaseComponent],
  declarations: [PlayTypographyShowcaseComponent],
  providers: [],
})
export class PlayTypographyShowcaseModule {}

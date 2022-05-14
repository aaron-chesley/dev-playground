import { NgModule } from '@angular/core';
import { PlayCardModule } from '../play-card.module';

import { PlayCardShowcaseComponent } from './play-card-showcase.component';

@NgModule({
  imports: [PlayCardModule],
  exports: [PlayCardShowcaseComponent],
  declarations: [PlayCardShowcaseComponent],
  providers: [],
})
export class PlayCardShowcaseModule {}

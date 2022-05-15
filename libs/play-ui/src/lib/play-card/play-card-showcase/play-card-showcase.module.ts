import { NgModule } from '@angular/core';
import { PlayButtonModule } from '../../play-button/play-button.module';
import { PlayCardModule } from '../play-card.module';

import { PlayCardShowcaseComponent } from './play-card-showcase.component';

@NgModule({
  imports: [PlayCardModule, PlayButtonModule],
  exports: [PlayCardShowcaseComponent],
  declarations: [PlayCardShowcaseComponent],
  providers: [],
})
export class PlayCardShowcaseModule {}

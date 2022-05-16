import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayCardBodyModule } from '../play-card-body/play-card-body.module';
import { PlayCardFooterModule } from '../play-card-footer/play-card-footer.module';
import { PlayCardHeaderModule } from '../play-card-header/play-card-header.module';
import { PlayCardComponent } from './play-card.component';

@NgModule({
  imports: [
    CommonModule,
    PlayCardHeaderModule,
    PlayCardFooterModule,
    PlayCardBodyModule,
  ],
  exports: [
    PlayCardComponent,
    PlayCardHeaderModule,
    PlayCardFooterModule,
    PlayCardBodyModule,
  ],
  declarations: [PlayCardComponent],
  providers: [],
})
export class PlayCardModule {}

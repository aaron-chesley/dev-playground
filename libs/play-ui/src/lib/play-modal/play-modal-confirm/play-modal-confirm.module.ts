import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { PlayButtonModule } from '../../play-button/play-button.module';
import { PlayCardModule } from '../../play-card/play-card/play-card.module';
import { PlayRippleModule } from '../../play-ripple/play-ripple';

import { PlayModalConfirmComponent } from './play-modal-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    PlayCardModule,
    PlayButtonModule,
    PlayRippleModule,
  ],
  exports: [PlayModalConfirmComponent],
  declarations: [PlayModalConfirmComponent],
  providers: [],
})
export class PlayModalConfirmModule {}

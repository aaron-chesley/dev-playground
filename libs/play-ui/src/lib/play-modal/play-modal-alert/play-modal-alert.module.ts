import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { PlayButtonModule } from '../../play-button/play-button.module';
import { PlayCardModule } from '../../play-card/play-card/play-card.module';

import { PlayModalAlertComponent } from './play-modal-alert.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, PlayCardModule, PlayButtonModule],
  exports: [PlayModalAlertComponent],
  declarations: [PlayModalAlertComponent],
  providers: [],
})
export class PlayModalAlertModule {}

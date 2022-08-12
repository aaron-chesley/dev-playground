import { NgModule } from '@angular/core';

import { DialogModule } from '@angular/cdk/dialog';
import { PlayModalAlertModule } from './play-modal-alert/play-modal-alert.module';
import { PlayModalConfirmModule } from './play-modal-confirm/play-modal-confirm.module';

@NgModule({
  imports: [DialogModule, PlayModalAlertModule, PlayModalConfirmModule],
  exports: [],
  declarations: [],
  providers: [],
})
export class PlayModalModule {}

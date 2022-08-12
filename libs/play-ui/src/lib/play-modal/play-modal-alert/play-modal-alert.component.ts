import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { PlayModalAlertData } from './play-modal-alert-data.interface';

@Component({
  selector: 'play-modal-alert',
  templateUrl: './play-modal-alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayModalAlertComponent {
  constructor(
    @Inject(DIALOG_DATA) public data: PlayModalAlertData,
    private dialogRef: DialogRef<PlayModalAlertComponent>
  ) {}
  closeDialog() {
    this.dialogRef.close();
  }
}

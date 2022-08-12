import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { PlayModalConfirmData } from './play-modal-confirm-data.interface';

@Component({
  selector: 'play-modal-confirm',
  templateUrl: './play-modal-confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayModalConfirmComponent {
  closeDialog(value: boolean) {
    this.dialogRef.close(value);
  }

  constructor(
    @Inject(DIALOG_DATA) public data: PlayModalConfirmData,
    private dialogRef: DialogRef<boolean, PlayModalConfirmComponent>
  ) {}
}

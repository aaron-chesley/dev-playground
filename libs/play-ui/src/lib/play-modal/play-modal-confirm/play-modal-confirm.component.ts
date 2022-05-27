import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayModalConfirmData } from './play-modal-confirm-data.interface';

@Component({
  selector: 'play-modal-confirm',
  templateUrl: './play-modal-confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayModalConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: PlayModalConfirmData) {}
}

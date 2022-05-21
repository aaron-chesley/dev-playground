import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayModalAlertData } from './play-modal-alert-data.interface';

@Component({
  selector: 'play-modal-alert',
  templateUrl: './play-modal-alert.component.html',
  styleUrls: ['../_play-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayModalAlertComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: PlayModalAlertData) {}
}

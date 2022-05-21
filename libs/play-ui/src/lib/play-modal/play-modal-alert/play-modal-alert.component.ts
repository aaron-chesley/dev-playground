import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'play-modal-alert',
  templateUrl: './play-modal-alert.component.html',
  styleUrls: ['../_play-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayModalAlertComponent {}

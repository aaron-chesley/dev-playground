import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { PlayModalAlertData } from './play-modal-alert-data.interface';
import { PlayCardComponent } from '../../play-card/play-card/play-card.component';
import { PlayButtonComponent } from '../../play-button/play-button.component';
import { PlayCardHeaderComponent } from '../../play-card/play-card-header/play-card-header.component';
import { PlayCardBodyComponent } from '../../play-card/play-card-body/play-card-body.component';
import { PlayCardFooterComponent } from '../../play-card/play-card-footer/play-card-footer.component';

@Component({
  selector: 'play-modal-alert',
  templateUrl: './play-modal-alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    PlayCardComponent,
    PlayCardHeaderComponent,
    PlayCardBodyComponent,
    PlayCardFooterComponent,
    PlayButtonComponent,
  ],
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

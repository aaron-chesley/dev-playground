import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { PlayModalConfirmData } from './play-modal-confirm-data.interface';
import { PlayCardComponent } from '../../play-card/play-card/play-card.component';
import { PlayButtonComponent } from '../../play-button/play-button.component';
import { PlayCardHeaderComponent } from '../../play-card/play-card-header/play-card-header.component';
import { PlayCardBodyComponent } from '../../play-card/play-card-body/play-card-body.component';
import { PlayCardFooterComponent } from '../../play-card/play-card-footer/play-card-footer.component';
import { PlayButtonGroupComponent } from '../../play-button/play-button-group/play-button-group.component';

@Component({
    selector: 'play-modal-confirm',
    templateUrl: './play-modal-confirm.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        PlayCardComponent,
        PlayCardHeaderComponent,
        PlayCardBodyComponent,
        PlayCardFooterComponent,
        PlayButtonComponent,
        PlayButtonGroupComponent,
    ]
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

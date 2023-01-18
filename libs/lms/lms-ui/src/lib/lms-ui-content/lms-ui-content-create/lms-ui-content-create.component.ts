import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { LmsContentItemCreate } from '@playground/lms/lms-util';
import {
  PlayButtonComponent,
  PlayButtonGroupComponent,
  PlayCardBodyComponent,
  PlayCardComponent,
  PlayCardFooterComponent,
  PlayCardHeaderComponent,
} from '@playground/play-ui';

@Component({
  selector: 'lms-ui-content-create',
  templateUrl: './lms-ui-content-create.component.html',
  styleUrls: ['./lms-ui-content-create.component.scss'],
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
    PlayButtonGroupComponent,
  ],
})
export class LmsUiContentCreateComponent {
  @HostBinding('class.lms-ui-content-create') lmsUiContentCreateClass =
    'lms-ui-content-create';

  closeDialog() {
    this.dialogRef.close({
      content_type: 'VIDEO',
      slide: null,
      video: {
        description: '23423',
        duration: '23423',
        name: '32423432',
        thumbnail_url: '23423',
        video_url: '234234',
      },
    });
  }

  constructor(
    private dialogRef: DialogRef<
      LmsContentItemCreate,
      LmsUiContentCreateComponent
    >
  ) {}
}

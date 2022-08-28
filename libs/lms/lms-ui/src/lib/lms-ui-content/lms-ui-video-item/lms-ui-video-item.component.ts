import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { LmsVideo } from '@playground/lms/lms-util';
import { PlayCardModule, PlayTextComponent } from '@playground/play-ui';

@Component({
  selector: 'lms-ui-video-item',
  templateUrl: './lms-ui-video-item.component.html',
  styleUrls: ['./lms-ui-video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, PlayCardModule, PlayTextComponent],
})
export class LmsUiVideoItemComponent {
  @HostBinding('class.lms-ui-video-item') playCardClass = 'lms-ui-video-item';
  @Input() video: LmsVideo;
  @Input() imgWidth = 200;
}

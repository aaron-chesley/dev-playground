import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { LmsContentItem } from '@playground/lms/lms-util';
import { LmsUiVideoItemComponent } from '../lms-ui-video-item/lms-ui-video-item.component';

@Component({
  selector: 'lms-ui-content-list',
  templateUrl: './lms-ui-content-list.component.html',
  styleUrls: ['./lms-ui-content-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, LmsUiVideoItemComponent],
})
export class LmsUiContentListComponent {
  @HostBinding('class.lms-ui-content-list') playCardClass =
    'lms-ui-content-list';
  @Input() contentItems: LmsContentItem[] = [];
}

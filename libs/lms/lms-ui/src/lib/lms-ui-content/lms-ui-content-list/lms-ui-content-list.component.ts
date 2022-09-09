import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { LmsContentItem } from '@playground/lms/lms-util';
import { PlayPaginatorComponent } from '@playground/play-ui';
import { LmsUiVideoItemComponent } from '../lms-ui-video-item/lms-ui-video-item.component';

@Component({
  selector: 'lms-ui-content-list',
  templateUrl: './lms-ui-content-list.component.html',
  styleUrls: ['./lms-ui-content-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, LmsUiVideoItemComponent, PlayPaginatorComponent],
})
export class LmsUiContentListComponent {
  @HostBinding('class.lms-ui-content-list') playCardClass =
    'lms-ui-content-list';
  @Input() contentItems: LmsContentItem[] = [];
  @Input() count = 0;
  @Input() itemsPerPage = 8;
  @Input() currentPage = 1;

  @Output() nextPageClick = new EventEmitter<void>();
  @Output() previousPageClick = new EventEmitter<void>();
}

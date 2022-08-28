import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LmsContentItem } from '@playground/lms/lms-util';
import {
  PlayCardModule,
  PlayHeadingModule,
  PlayTextModule,
} from '@playground/play-ui';

@Component({
  selector: 'lms-ui-content-list',
  templateUrl: './lms-ui-content-list.component.html',
  styleUrls: ['./lms-ui-content-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PlayCardModule, PlayHeadingModule],
})
export class LmsUiContentListComponent {
  @Input() contentItems: LmsContentItem[] = [];
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PlayButtonModule, PlayCardModule } from '@playground/play-ui';
import { LmsUiTag } from '../lms-ui-tag.interface';

@Component({
  selector: 'lms-ui-tags-list',
  templateUrl: './lms-ui-tags-list.component.html',
  styleUrls: ['./lms-ui-tags-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PlayCardModule, PlayButtonModule],
})
export class LmsUiTagsListComponent {
  @Input() tags: LmsUiTag[] = [];
  @Output() deleteTagClick = new EventEmitter<LmsUiTag>();
}

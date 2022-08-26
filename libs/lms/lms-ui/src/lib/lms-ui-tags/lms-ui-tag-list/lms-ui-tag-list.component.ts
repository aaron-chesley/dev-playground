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
  selector: 'lms-ui-tag-list',
  templateUrl: './lms-ui-tag-list.component.html',
  styleUrls: ['./lms-ui-tag-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PlayCardModule, PlayButtonModule],
})
export class LmsUiTagListComponent {
  @Input() tags: LmsUiTag[] = [];
  @Output() deleteTagClick = new EventEmitter<LmsUiTag>();
}

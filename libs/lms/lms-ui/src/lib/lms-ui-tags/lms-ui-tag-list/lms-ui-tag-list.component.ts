import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PlayButtonComponent, PlayCardComponent } from '@playground/play-ui';
import { PlayCardBodyComponent } from 'libs/play-ui/src/lib/play-card/play-card-body/play-card-body.component';
import { PlayCardFooterComponent } from 'libs/play-ui/src/lib/play-card/play-card-footer/play-card-footer.component';
import { LmsUiTag } from '../lms-ui-tag.interface';

@Component({
  selector: 'lms-ui-tag-list',
  templateUrl: './lms-ui-tag-list.component.html',
  styleUrls: ['./lms-ui-tag-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PlayCardComponent,
    PlayCardBodyComponent,
    PlayCardFooterComponent,
    PlayButtonComponent,
  ],
})
export class LmsUiTagListComponent {
  @Input() tags: LmsUiTag[] = [];
  @Output() deleteTagClick = new EventEmitter<LmsUiTag>();
}

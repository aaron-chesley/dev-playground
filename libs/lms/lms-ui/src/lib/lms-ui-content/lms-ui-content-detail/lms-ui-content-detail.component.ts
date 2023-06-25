import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { PlayCardBodyComponent, PlayCardComponent } from '@playground/play-ui';
import { LmsContentItem } from '@playground/lms-util';
import { YouTubeIdPipe } from '../youtube-id.pipe';

@Component({
  selector: 'lms-ui-content-detail',
  templateUrl: './lms-ui-content-detail.component.html',
  styleUrls: ['./lms-ui-content-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    YouTubePlayerModule,
    PlayCardComponent,
    PlayCardBodyComponent,
    YouTubeIdPipe,
  ],
})
export class LmsUiContentDetailComponent implements OnInit {
  @HostBinding('class.lms-ui-content-detail') lmsUiContentDetailClass =
    'lms-ui-content-detail';

  @Input() content: LmsContentItem;

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
}

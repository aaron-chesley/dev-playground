import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { PlayCardService } from './play-card.service';

@Component({
  selector: 'play-card',
  templateUrl: './play-card.component.html',
  styleUrls: ['./play-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [PlayCardService],
})
export class PlayCardComponent {
  @HostBinding('class') className = 'play-card';
}

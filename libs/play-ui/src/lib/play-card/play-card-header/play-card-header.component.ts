import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { PlayCardService } from '../play-card.service';

@Component({
  selector: 'play-card-header',
  templateUrl: './play-card-header.component.html',
  styleUrls: ['./play-card-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayCardHeaderComponent implements OnDestroy {
  @HostBinding('class') className = 'play-card-header';
  @HostBinding('style.justify-content') justifyContent = 'left';
  @Input() set position(
    value: 'left' | 'center' | 'right' | 'space-around' | 'space-between'
  ) {
    this.justifyContent = value;
  }

  ngOnDestroy() {
    this.playCardService.hasHeader = false;
  }

  constructor(private playCardService: PlayCardService) {
    this.playCardService.hasHeader = true;
  }
}

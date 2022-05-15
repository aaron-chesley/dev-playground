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
  selector: 'play-card-footer',
  templateUrl: './play-card-footer.component.html',
  styleUrls: ['./play-card-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayCardFooterComponent implements OnDestroy {
  @HostBinding('class') className = 'play-card-footer';
  @HostBinding('style.justify-content') justifyContent = 'left';
  @Input() set position(
    value: 'left' | 'center' | 'right' | 'space-around' | 'space-between'
  ) {
    this.justifyContent = value;
  }

  ngOnDestroy() {
    this.playCardService.hasFooter = false;
  }

  constructor(private playCardService: PlayCardService) {
    this.playCardService.hasFooter = true;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { PlayCardFooterComponent } from './play-card-footer/play-card-footer.component';
import { PlayCardHeaderComponent } from './play-card-header/play-card-header.component';

@Component({
  selector: 'play-card',
  templateUrl: './play-card.component.html',
  styleUrls: ['./play-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayCardComponent {
  @HostBinding('class.play-card') playCardClass = 'play-card';
  @HostBinding('class.play-card-has-header') playCardHasHeader = '';
  @HostBinding('class.play-card-has-footer') playCardHasFooter = '';

  @ContentChild(PlayCardHeaderComponent)
  set playCardHeaderComponent(value: PlayCardHeaderComponent) {
    this.playCardHasHeader = value ? 'play-card-has-header' : '';
  }

  @ContentChild(PlayCardFooterComponent)
  set playCardFooterComponent(value: PlayCardFooterComponent) {
    this.playCardHasFooter = value ? 'play-card-has-footer' : '';
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'play-card-header',
  templateUrl: './play-card-header.component.html',
  styleUrls: ['./play-card-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayCardHeaderComponent {
  @HostBinding('class') className = 'play-card-header';
}

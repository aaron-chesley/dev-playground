import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'play-card-footer',
  templateUrl: './play-card-footer.component.html',
  styleUrls: ['./play-card-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayCardFooterComponent {
  @HostBinding('class') className = 'play-card-footer';
}

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'play-card-body',
  templateUrl: './play-card-body.component.html',
  styleUrls: ['./play-card-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayCardBodyComponent {
  @HostBinding('class.play-card-body') className = 'play-card-body';
}

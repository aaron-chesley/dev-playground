import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'play-text',
  templateUrl: './play-text.component.html',
  styleUrls: ['./play-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayTextComponent {
  @HostBinding('className') playText = 'play-text';
}

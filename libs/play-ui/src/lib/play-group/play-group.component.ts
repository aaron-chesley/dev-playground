import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'play-group',
  templateUrl: './play-group.component.html',
  styleUrls: ['./play-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PlayGroupComponent {
  @Input() gap = '0.5rem';
  @Input() direction: 'row' | 'column' = 'row';

  @HostBinding('style.gap') get _gap(): string {
    return this.gap;
  }

  @HostBinding('style.flex-direction') get _direction(): string {
    return this.direction;
  }
}

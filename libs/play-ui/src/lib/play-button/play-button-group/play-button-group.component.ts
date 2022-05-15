import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'play-button-group',
  templateUrl: './play-button-group.component.html',
  styleUrls: ['./play-button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayButtonGroupComponent {
  @HostBinding('class') className = 'play-btn-group';
  @HostBinding('style.gap') gapInPixels = '0px';
  @Input() set gap(value: number) {
    this.gapInPixels = `${value}px`;
  }
}

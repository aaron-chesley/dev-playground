import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
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
  @HostBinding('class') className = 'play-card-body';
  @HostBinding('style.height') heightInPixels = '';
  @Input() set height(value: number) {
    this.heightInPixels = `${value}px`;
  }
}

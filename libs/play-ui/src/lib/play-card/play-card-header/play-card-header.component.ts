import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
    selector: 'play-card-header',
    templateUrl: './play-card-header.component.html',
    styleUrls: ['./play-card-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class PlayCardHeaderComponent {
  @HostBinding('class') className = 'play-card-header';
  @HostBinding('style.justify-content') justifyContent = 'left';
  @Input() set position(
    value: 'left' | 'center' | 'right' | 'space-around' | 'space-between'
  ) {
    this.justifyContent = value;
  }
}

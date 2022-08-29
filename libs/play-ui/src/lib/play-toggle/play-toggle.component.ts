import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CheckedBase, DisabledBase, LabelPositionBase } from '../mixins/input';

const PlayToggle = CheckedBase(DisabledBase(LabelPositionBase()));

@Component({
  selector: 'play-toggle',
  templateUrl: './play-toggle.component.html',
  styleUrls: ['./play-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class PlayToggleComponent extends PlayToggle {
  @HostBinding('class') className = 'play-toggle';
}

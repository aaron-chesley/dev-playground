import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CheckedBase, DisabledBase, LabelPositionBase } from '../mixins/input';

const PlayCheckbox = CheckedBase(DisabledBase(LabelPositionBase()));

@Component({
  selector: 'play-checkbox',
  templateUrl: './play-checkbox.component.html',
  styleUrls: ['./play-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class PlayCheckboxComponent extends PlayCheckbox {
  @HostBinding('class') className = 'play-checkbox';
}

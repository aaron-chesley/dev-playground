import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CheckedBase, DisabledBase, LabelPositionBase } from '../mixins/input';

const PlayRadio = CheckedBase(DisabledBase(LabelPositionBase()));

@Component({
  selector: 'play-radio',
  templateUrl: './play-radio.component.html',
  styleUrls: ['./play-radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayRadioComponent extends PlayRadio {
  @HostBinding('class') className = 'play-radio';
}

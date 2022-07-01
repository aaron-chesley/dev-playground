import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'play-checkbox',
  templateUrl: './play-checkbox.component.html',
  styleUrls: ['./play-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlayCheckboxComponent {
  @HostBinding('class')
  className = 'play-checkbox';

  @Input() checked = false;
}

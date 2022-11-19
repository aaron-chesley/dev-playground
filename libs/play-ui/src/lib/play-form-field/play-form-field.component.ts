import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'play-form-field',
  templateUrl: './play-form-field.component.html',
  styleUrls: ['./play-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [],
})
export class PlayFormFieldComponent {
  @HostBinding('class') className = 'play-form-field';
}

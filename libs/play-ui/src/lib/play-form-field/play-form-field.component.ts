import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'play-form-field',
  templateUrl: './play-form-field.component.html',
  styleUrls: ['./play-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class PlayFormFieldComponent {}

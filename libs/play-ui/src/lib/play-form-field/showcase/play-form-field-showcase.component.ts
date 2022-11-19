import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayInputTextComponent } from '../../play-input-text/play-input-text.component';
import { PlayFormFieldComponent } from '../play-form-field.component';

@Component({
  selector: 'play-form-field-showcase',
  templateUrl: './play-form-field-showcase.component.html',
  styleUrls: ['./play-form-field-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PlayFormFieldComponent, PlayInputTextComponent],
})
export class PlayFormFieldShowcaseComponent {}

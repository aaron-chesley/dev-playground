import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlayIconRegistryService } from '../../play-icon/play-icon-registry.service';
import { PlayIconComponent } from '../../play-icon/play-icon.component';
import { search } from '../../play-icon/play-icons';
import { PlayInputTextComponent } from '../../play-input-text/play-input-text.component';
import { PlayFormFieldErrorComponent } from '../play-form-field-error.component';
import { PlayFormFieldLabelComponent } from '../play-form-field-label.component';
import { PlayFormFieldComponent } from '../play-form-field.component';

@Component({
  selector: 'play-form-field-showcase',
  templateUrl: './play-form-field-showcase.component.html',
  styleUrls: ['./play-form-field-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PlayFormFieldComponent,
    PlayFormFieldLabelComponent,
    PlayInputTextComponent,
    PlayIconComponent,
    PlayFormFieldErrorComponent,
  ],
})
export class PlayFormFieldShowcaseComponent {
  emailControl = new FormControl('', [Validators.email, Validators.required]);
  constructor(private playIconService: PlayIconRegistryService) {
    this.playIconService.registerIcons([search]);
  }
}

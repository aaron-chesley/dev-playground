import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayIconRegistryService } from '../../play-icon/play-icon-registry.service';
import { PlayIconComponent } from '../../play-icon/play-icon.component';
import { search } from '../../play-icon/play-icons';
import { PlayInputTextComponent } from '../../play-input-text/play-input-text.component';
import { PlayFormFieldComponent } from '../play-form-field.component';

@Component({
  selector: 'play-form-field-showcase',
  templateUrl: './play-form-field-showcase.component.html',
  styleUrls: ['./play-form-field-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PlayFormFieldComponent, PlayInputTextComponent, PlayIconComponent],
})
export class PlayFormFieldShowcaseComponent {
  constructor(private playIconService: PlayIconRegistryService) {
    this.playIconService.registerIcons([search]);
  }
}

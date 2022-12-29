import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayFormFieldLabelComponent } from '../play-form-field/play-form-field-label.component';
import { PlayFormFieldComponent } from '../play-form-field/play-form-field.component';
import { PlayIconRegistryService } from '../play-icon/play-icon-registry.service';
import { PlayIconComponent } from '../play-icon/play-icon.component';
import { arrowDropDown } from '../play-icon/play-icons';
import { PlayInputTextComponent } from '../play-input-text/play-input-text.component';

@Component({
  selector: 'play-select',
  templateUrl: './play-select.component.html',
  styleUrls: ['./play-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PlayFormFieldComponent,
    PlayFormFieldLabelComponent,
    PlayIconComponent,
    PlayInputTextComponent,
  ],
})
export class PlaySelectComponent {
  constructor(private iconService: PlayIconRegistryService) {
    this.iconService.registerIcons([arrowDropDown]);
  }
}

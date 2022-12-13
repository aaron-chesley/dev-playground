import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LabelPosition } from '../../label-position.type';
import { PlayCheckboxComponent } from '../play-checkbox.component';

@Component({
  selector: 'play-checkbox-showcase',
  templateUrl: './play-checkbox-showcase.component.html',
  styleUrls: ['./play-checkbox-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PlayCheckboxComponent, FormsModule],
})
export class PlayCheckboxShowcaseComponent {
  labelPosition: LabelPosition = 'after';
  checked = true;
  disabled = false;
}

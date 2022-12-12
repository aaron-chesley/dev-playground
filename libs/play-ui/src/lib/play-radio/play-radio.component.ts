import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { getLabelPosition, LabelPosition } from '../label-position.type';
import { PlayRadioGroupService } from './play-radio-group.service';

@Component({
  selector: 'play-radio',
  templateUrl: './play-radio.component.html',
  styleUrls: ['./play-radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class PlayRadioComponent {
  @HostBinding('class') className = 'play-radio';

  @Input() value: unknown;
  @Input() id = uuidv4();
  @Input() disabled = false;
  @Input() set labelPosition(labelPosition: LabelPosition) {
    this._labelPosition = getLabelPosition(labelPosition);
  }

  _labelPosition = 'row';
  _name$: Observable<string>;
  _selectedValue$: Observable<unknown>;

  onCheckChange(event: Event) {
    this.radioService.setSelectedValue(
      (event.target as HTMLInputElement).value
    );
  }

  constructor(private radioService: PlayRadioGroupService) {
    this._selectedValue$ = this.radioService.getSelectedValue();
    this._name$ = this.radioService.getRadioGroupName();
  }
}

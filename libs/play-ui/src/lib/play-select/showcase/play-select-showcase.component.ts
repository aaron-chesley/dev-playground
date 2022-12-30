import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlaySelectOptionComponent } from '../play-select-option.component';
import { PlaySelectComponent } from '../play-select.component';

@Component({
  selector: 'play-select-showcase',
  templateUrl: './play-select-showcase.component.html',
  styleUrls: ['./play-select-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PlaySelectComponent, PlaySelectOptionComponent],
})
export class PlaySelectShowcaseComponent {}

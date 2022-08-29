import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayInputTextComponent } from '../play-input-text.component';

@Component({
  selector: 'play-input-text-showcase',
  templateUrl: './play-input-text-showcase.component.html',
  styleUrls: ['./play-input-text-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PlayInputTextComponent],
})
export class PlayInputTextShowcaseComponent {}

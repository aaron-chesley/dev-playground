import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'playground-kalshi-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kalshi-ui.component.html',
  styleUrls: ['./kalshi-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KalshiUiComponent {}

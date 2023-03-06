import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'playground-kalshi-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kalshi-features.component.html',
  styleUrls: ['./kalshi-features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KalshiFeaturesComponent {}

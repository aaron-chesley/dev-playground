import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'playground-kalshi-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kalshi-data.component.html',
  styleUrls: ['./kalshi-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KalshiDataComponent {}

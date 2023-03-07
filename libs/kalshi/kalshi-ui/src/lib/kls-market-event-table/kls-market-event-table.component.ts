import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KlsMarketEvent } from '@playground/kalshi-util';

@Component({
  standalone: true,
  selector: 'kls-market-event-table',
  templateUrl: './kls-market-event-table.component.html',
  styleUrls: ['./kls-market-event-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class KlsMarketEventTableComponent {
  @Input() marketEvent: KlsMarketEvent;
}

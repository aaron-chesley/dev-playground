import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { KlsMarketEventTableComponent } from '@playground/kalshi-ui';
import { selectMarketEvent } from '../state/kalshi.selectors';

@Component({
  standalone: true,
  imports: [CommonModule, KlsMarketEventTableComponent],
  selector: 'kls-feat',
  template: `<kls-market-event-table
    [marketEvent]="marketEvent$ | async"
  ></kls-market-event-table>`,
})
export class KlsFeatComponent {
  marketEvent$ = this.store.select(selectMarketEvent);
  constructor(private store: Store) {}
}

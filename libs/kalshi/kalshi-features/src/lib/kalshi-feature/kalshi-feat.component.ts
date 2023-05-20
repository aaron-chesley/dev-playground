import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { KalshiApiService } from '@playground/kalshi-data';
import { KlsMarketEventTableComponent } from '@playground/kalshi-ui';
import { catchError, switchMap } from 'rxjs';
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
  constructor(private store: Store, private apiService: KalshiApiService) {
    setTimeout(() => {
      this.apiService
        .login({
          email: '',
          password: '',
        })
        .pipe(switchMap(() => this.apiService.getPortfolioBalance()))
        .subscribe((res) => console.log('res: ', res));

      // this.apiService
      //   .login({
      //     email: ',
      //     password: '',
      //   })
      //   .subscribe((res) => console.log('res: ', res));
    }, 5000);
  }
}

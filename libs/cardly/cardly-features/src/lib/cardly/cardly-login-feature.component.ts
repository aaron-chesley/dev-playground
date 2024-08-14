import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, AuthenticationState, selectLoading } from '@playground/cardly-data';
import { CardlyLoginComponent } from '@playground/cardly-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'cardly-login-modal-feature',
  template: `<cardly-login [loading]="loading$ | async" (login)="onLogin($event)"></cardly-login>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, CardlyLoginComponent],
})
export class CardlyLoginFeatureComponent implements OnInit {
  loading$: Observable<boolean>;

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
  }

  onLogin(displayName: string) {
    this.store.dispatch(AuthActions.login({ displayName }));
  }

  constructor(private store: Store<AuthenticationState>) {}
}

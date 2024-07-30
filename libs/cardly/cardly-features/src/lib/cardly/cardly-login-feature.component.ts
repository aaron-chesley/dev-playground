import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '@playground/cardly-data';
import { CardlyLoginComponent } from '@playground/cardly-ui';

@Component({
  selector: 'cardly-login-modal-feature',
  template: `<cardly-login (login)="onLogin($event)"></cardly-login>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardlyLoginComponent],
})
export class CardlyLoginFeatureComponent {
  onLogin(displayName: string) {
    this.store.dispatch(AuthActions.login({ displayName }));
  }
  constructor(private store: Store) {}
}

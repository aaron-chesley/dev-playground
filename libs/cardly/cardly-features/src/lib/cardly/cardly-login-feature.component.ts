import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardlyAuthenticationService } from '@playground/cardly-data';
import { CardlyLoginComponent } from '@playground/cardly-ui';
import { tap } from 'rxjs';

@Component({
  selector: 'cardly-login-modal-feature',
  template: `<cardly-login (login)="onLogin($event)"></cardly-login>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardlyLoginComponent],
})
export class CardlyLoginFeatureComponent {
  onLogin(displayName: string) {
    this.authService
      .register(displayName)
      .pipe(tap(() => this.router.navigate(['/scum'])))
      .subscribe();
  }
  constructor(
    private authService: CardlyAuthenticationService,
    private router: Router,
  ) {}
}

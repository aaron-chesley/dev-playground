import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { environment } from '@playground/environment';
import {
  AUTHENTICATION_SERVICE,
  PlayAuthenticationService,
  LoginPayload,
  PlayAuthenticationDemoService,
  AuthenticationService,
} from '@playground/play-lms/play-lms-data';
import { PlayLmsUiLoginComponent } from '@playground/play-lms/play-lms-ui';

@Component({
  selector: 'play-lms-login-feature',
  template: `<play-lms-ui-login
    [loading]="loading$ | async"
    (loginClicked)="attemptLogin($event)"
  ></play-lms-ui-login>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PlayLmsUiLoginComponent],
  providers: [
    {
      provide: AUTHENTICATION_SERVICE,
      useClass: environment.demoMode
        ? PlayAuthenticationDemoService
        : PlayAuthenticationService,
    },
  ],
})
export class PlayLmsLoginFeatureComponent {
  private loadingSub = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSub.asObservable();

  attemptLogin(credentials: LoginPayload) {
    this.loadingSub.next(true);
    this.authService
      .attemptAuth(credentials)
      .pipe(finalize(() => this.loadingSub.next(false)))
      .subscribe();
  }
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private authService: AuthenticationService
  ) {}
}

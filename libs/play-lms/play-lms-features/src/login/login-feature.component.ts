import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AUTHENTICATION_SERVICE,
  PlayAuthenticationService,
  LoginPayload,
} from '@dev-playground/play-lms/play-lms-data';
import { PlayLmsUiLoginComponent } from '@dev-playground/play-lms/play-lms-ui';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
      useClass: PlayAuthenticationService,
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
  constructor(private authService: PlayAuthenticationService) {}
}

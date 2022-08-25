import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

import {
  LoginPayload,
  PlayAuthenticationService,
} from '@playground/play-lms/play-lms-data';
import { PlayLmsUiLoginComponent } from '@playground/play-lms/play-lms-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'play-lms-login-feature',
  template: `<play-lms-ui-login
    [loading]="loading$ | async"
    (loginClicked)="attemptLogin($event)"
  ></play-lms-ui-login>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PlayLmsUiLoginComponent],
})
export class PlayLmsLoginFeatureComponent {
  private loadingSub = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSub.asObservable();

  attemptLogin(credentials: LoginPayload) {
    this.loadingSub.next(true);
    this.authService
      .attemptAuth(credentials)
      .pipe(
        finalize(() => this.loadingSub.next(false)),
        switchMap(() => this.authService.me())
      )
      .subscribe((user) =>
        user.is_superuser
          ? this.router.navigate(['/app/trainings'])
          : this.router.navigate(['/app/dashboard'])
      );
  }
  constructor(
    private authService: PlayAuthenticationService,
    private router: Router
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AuthActions from './authentication.actions';
import { CardlyAuthenticationService } from '../cardly-authentication.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.register(action.displayName).pipe(
          map((res) => {
            const user = this.authService.getUserFromToken(res.token);
            return AuthActions.loginSuccess({ user });
          }),
          catchError(() => of(AuthActions.loginFailure())),
        ),
      ),
    ),
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        switchMap(() => {
          return this.router.navigate(['/scum']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: CardlyAuthenticationService,
    private router: Router,
  ) {}
}

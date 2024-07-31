import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AuthActions from './authentication.actions';
import { CardlyAuthenticationService } from '../cardly-authentication.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CardlyWebsocketService } from '../../cardly-websocket.service';

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

  connectToSocket$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.connectToSocket),
        switchMap(() => {
          this.socketService.connect();
          return of();
        }),
      ),
    { dispatch: false },
  );

  disconnectFromSocket$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.disconnectFromSocket),
        switchMap(() => {
          this.socketService.disconnect();
          return of();
        }),
      ),
    { dispatch: false },
  );

  connectToSocketAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(() => AuthActions.connectToSocket()),
    ),
  );

  disconnectFromSocketAfterLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutSuccess),
      map(() => AuthActions.disconnectFromSocket()),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutFailure())),
        ),
      ),
    ),
  );

  redirectAfterLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        switchMap(() => {
          return this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: CardlyAuthenticationService,
    private router: Router,
    private socketService: CardlyWebsocketService,
  ) {}
}

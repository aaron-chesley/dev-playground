import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthActions, AuthenticationState, CardlyAuthenticationService, selectUser } from '@playground/cardly-data';
import { Store } from '@ngrx/store';

export const CardlyAuthenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(CardlyAuthenticationService);
  const router = inject(Router);
  const store: Store<AuthenticationState> = inject(Store);

  // Check if the user is in the store. If not, check the auth service "me" endpoint. If that fails, redirect to login.
  return store.select(selectUser).pipe(
    switchMap((user) => {
      if (user) {
        return of(true);
      }

      return authService.me().pipe(
        switchMap((me) => {
          if (me) {
            store.dispatch(AuthActions.loginSuccess({ user: me }));
            return of(true);
          }

          return router.navigate(['/login']);
        }),
      );
    }),
  );
};

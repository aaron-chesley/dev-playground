import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { CardlyAuthenticationService } from '@playground/cardly-data';

export const CardlyAuthenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const service = inject(CardlyAuthenticationService);
  const router = inject(Router);

  return service.isAuthenticated().pipe(
    switchMap((isAuthenticated) => {
      if (isAuthenticated) {
        return of(true);
      }

      router.navigate(['login']);

      return of(false);
    }),
  );
};

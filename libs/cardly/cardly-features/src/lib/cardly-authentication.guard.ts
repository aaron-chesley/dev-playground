import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { PlayModalService } from '@playground/play-ui';
import { LoginModalComponent } from '@playground/cardly-ui';
import { CardlyAuthenticationService } from '@playground/cardly-data';

export const CardlyAuthenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const service = inject(CardlyAuthenticationService);
  const modalService = inject(PlayModalService);

  return service.isAuthenticated().pipe(
    switchMap((isAuthenticated) => {
      if (isAuthenticated) {
        return of(true);
      }

      return modalService
        .custom<any, null, { displayName: string }>(LoginModalComponent, { disableClose: true })
        .closed.pipe(
          switchMap((payload) => service.register(payload.displayName)),
          switchMap(() => service.isAuthenticated()),
        );
    }),
  );
};

import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanLoad,
  CanActivateChild,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  JwtService,
  PlayAuthenticationService,
} from '@playground/play-lms/play-lms-data';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private authService: PlayAuthenticationService,
    private jwtService: JwtService
  ) {}

  canActivate(): Observable<boolean> {
    return this.canLoad();
  }

  canActivateChild(): Observable<boolean> {
    return this.canLoad();
  }

  canLoad(): Observable<boolean> {
    const token = this.jwtService.getToken();
    const isTokenExpired = this.jwtService.isExpired(token);

    if (token && !isTokenExpired) {
      return of(true);
    }

    // If we have a non-expired refresh token, use it.
    const refreshToken = this.jwtService.getRefreshToken();
    const refreshTokenExpired = this.jwtService.isExpired(refreshToken);
    if (refreshToken && !refreshTokenExpired) {
      return this.authService
        .refreshToken(refreshToken)
        .pipe(map((res) => !!res));
    } else {
      // If our refresh token doesn't exist or is expired we need the user to login again.
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}

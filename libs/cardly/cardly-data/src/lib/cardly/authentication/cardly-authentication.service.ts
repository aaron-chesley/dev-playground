import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CardlyToken, CardlyUser } from '@playground/cardly-util';
import { ApiService } from '@playground/shared/shared-data';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardlyAuthenticationService {
  getUserFromToken(token: string): CardlyUser | undefined {
    if (token) {
      try {
        const decodedToken = this.jwtHelperService.decodeToken<CardlyToken>(token);
        return decodedToken.user;
      } catch (e) {
        return undefined;
      }
    }

    return undefined;
  }

  me(): Observable<CardlyUser> {
    return this.api.post<CardlyUser>('me', {});
  }

  register(displayName: string): Observable<{ token: string }> {
    return this.api.post<{ token: string }>('generate-token', { displayName });
  }

  logout(): Observable<void> {
    return this.api.post<void>('logout', {});
  }

  constructor(
    private api: ApiService,
    private jwtHelperService: JwtHelperService,
  ) {}
}

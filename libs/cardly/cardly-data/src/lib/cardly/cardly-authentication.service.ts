import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CardlyToken, CardlyUser } from '@playground/cardly-util';
import { ApiService } from '@playground/shared/shared-data';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardlyAuthenticationService {
  getAuthTokenFromStorage(): string {
    return sessionStorage.getItem('token');
  }

  getUserFromToken(): CardlyUser | undefined {
    const token = this.getAuthTokenFromStorage();
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

  isTokenValid(token: string): Observable<boolean> {
    return this.api.post<boolean>('validate', { token });
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.getAuthTokenFromStorage();
    if (token) {
      return this.isTokenValid(token);
    }

    return of(false);
  }

  register(displayName: string): Observable<{ token: string }> {
    return this.api.post<{ token: string }>('generate-token', { displayName }).pipe(
      tap((response) => {
        sessionStorage.setItem('token', response.token);
      }),
    );
  }

  constructor(
    private api: ApiService,
    private jwtHelperService: JwtHelperService,
  ) {}
}

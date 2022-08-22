import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { ServerLoginToken } from './authentication.models';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getToken(): string {
    return window.localStorage['token'];
  }

  getRefreshToken(): string {
    return window.localStorage['refreshToken'];
  }

  saveToken(token: ServerLoginToken) {
    if (token.access) {
      window.localStorage['token'] = token.access;
    }
    if (token.refresh) {
      window.localStorage['refreshToken'] = token.refresh;
    }
  }

  destroyToken() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('refreshToken');
  }

  decodeToken(token: string) {
    return helper.decodeToken(token);
  }

  getExpirationDate(token: string) {
    return helper.getTokenExpirationDate(token);
  }

  isExpired(token: string) {
    return helper.isTokenExpired(token);
  }
}

import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import { JwtService } from './jwt.service';
import {
  AuthUser,
  ServerLoginToken,
  LoginPayload,
  PasswordResetInstructionsPayload,
  PasswordResetPayload,
} from './lms-authentication.models';

@Injectable({
  providedIn: 'root',
})
export class LmsAuthenticationService {
  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  setAuth(data: ServerLoginToken): void {
    this.jwtService.saveToken(data);
  }

  purgeAuth() {
    // Remove JWT from localstorage:
    this.jwtService.destroyToken();
  }

  attemptAuth(credentials: LoginPayload): Observable<ServerLoginToken> {
    return this.apiService.post('auth/get_token/', credentials).pipe(
      tap((data: ServerLoginToken) => {
        this.setAuth(data);
      })
    );
  }

  refreshToken(token: string): Observable<ServerLoginToken> {
    return this.apiService.post('auth/refresh_token/', { refresh: token }).pipe(
      tap((data: ServerLoginToken) => {
        this.setAuth(data);
      })
    );
  }

  sendPasswordResetInstructions(body: PasswordResetInstructionsPayload) {
    return this.apiService.post('auth/password_reset/', body);
  }

  resetPassword(path: string, body: PasswordResetPayload) {
    return this.apiService.post(
      'auth/password_reset_confirm/' + path + '/',
      body
    );
  }

  me(): Observable<AuthUser | null> {
    return this.apiService.get('users/me/?expand=tenant');
    // .pipe(catchError(() => of(null)));
  }
}

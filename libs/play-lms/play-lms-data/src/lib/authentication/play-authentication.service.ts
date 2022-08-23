import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import { JwtService } from './jwt.service';
import {
  AuthUser,
  ServerLoginToken,
  LoginPayload,
  PasswordResetInstructionsPayload,
  PasswordResetPayload,
} from './authentication.models';
import { AuthenticationService } from './play-authentication-service.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayAuthenticationService implements AuthenticationService {
  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  setAuth(data: ServerLoginToken): void {
    this.jwtService.saveToken(data);
  }

  purgeAuth() {
    // Remove JWT from localstorage:
    this.jwtService.destroyToken();
  }

  attemptAuth(credentials: LoginPayload): Observable<AuthUser> {
    return this.apiService.post('auth/get_token/', credentials).pipe(
      switchMap((data: ServerLoginToken) => {
        this.setAuth(data);
        return this.me();
      })
    );
  }

  refreshToken(token: string) {
    return this.apiService.post('auth/refresh_token/', { refresh: token });
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

  me(): Observable<AuthUser> {
    return this.apiService.get('users/me/?expand=tenant');
  }
}

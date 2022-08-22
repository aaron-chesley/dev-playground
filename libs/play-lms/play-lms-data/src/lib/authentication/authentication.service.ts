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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  setAuth(data: ServerLoginToken) {
    this.jwtService.saveToken(data);
  }

  purgeAuth() {
    // Remove JWT from localstorage:
    this.jwtService.destroyToken();
  }

  attemptAuth(credentials: LoginPayload): Observable<AuthUser> {
    return this.apiService.post('/auth/get_token/', credentials).pipe(
      switchMap((data: ServerLoginToken) => {
        this.setAuth(data);
        return this.me();
      })
    );
  }

  refreshToken(token: string) {
    return this.apiService.post('/auth/refresh_token/', { refresh: token });
  }

  sendPasswordResetInstructions(body: PasswordResetInstructionsPayload) {
    return this.apiService.post('/auth/password_reset/', body);
  }

  resetPassword(path: string, body: PasswordResetPayload) {
    return this.apiService.post(
      '/auth/password_reset_confirm/' + path + '/',
      body
    );
  }

  me() {
    return this.apiService.get('/users/me/?expand=tenant');
  }
}

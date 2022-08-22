import { Injectable } from '@angular/core';

import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
export class PlayAuthenticationDemoService implements AuthenticationService {
  constructor(private jwtService: JwtService) {}

  setAuth(data: ServerLoginToken): void {
    this.jwtService.saveToken(data);
  }

  purgeAuth() {
    // Remove JWT from localstorage:
    this.jwtService.destroyToken();
  }

  attemptAuth(credentials: LoginPayload): Observable<AuthUser> {
    this.setAuth({
      access: 'myCoolAccessToken',
      refresh: 'myCoolRefreshToken',
    });
    return timer(2000).pipe(switchMap(() => this.me()));
  }

  refreshToken(token: string) {
    return;
  }

  sendPasswordResetInstructions(body: PasswordResetInstructionsPayload) {
    return;
  }

  resetPassword(path: string, body: PasswordResetPayload) {
    return;
  }

  me(): Observable<AuthUser> {
    return of({
      avatar: 'asdfasdf',
      date_hired: '2015-01-01',
      email: 'demo-user@demoinc.com',
      first_name: 'Bilbo',
      id: '83432849325u8934234',
      is_active: true,
      is_admin: false,
      is_superuser: false,
      last_name: 'Baggins',
      manager_of: [],
      teams: [],
      tenant: '1',
      url: 'mycoolurl.com',
    });
  }
}

import { Observable } from 'rxjs';
import {
  AuthUser,
  LoginPayload,
  PasswordResetInstructionsPayload,
  PasswordResetPayload,
  ServerLoginToken,
} from './authentication.models';

export const AUTHENTICATION_SERVICE = 'AUTHENTICATION_SERVICE';

export interface AuthenticationService {
  setAuth: (data: ServerLoginToken) => void;
  purgeAuth: () => void;
  attemptAuth: (credentials: LoginPayload) => Observable<AuthUser>;
  refreshToken: (token: string) => any;
  sendPasswordResetInstructions: (
    body: PasswordResetInstructionsPayload
  ) => void;
  resetPassword: (path: string, body: PasswordResetPayload) => void;
  me: () => Observable<AuthUser>;
}

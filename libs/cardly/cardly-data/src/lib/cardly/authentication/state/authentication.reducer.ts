import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '.';
import { CardlyUser } from '@playground/cardly-util';

export interface AuthenticationState {
  user: CardlyUser;
  loading: boolean;
}

export const authenticationFeatureKey = 'authentication';

export const initialState: AuthenticationState = {
  user: null,
  loading: false,
};

export const authenticationReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginSuccess, AuthActions.loginFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(AuthActions.setUser, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
  })),
);

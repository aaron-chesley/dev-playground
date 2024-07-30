import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '.';
import { CardlyUser } from '@playground/cardly-util';

export interface AuthenticationState {
  user: CardlyUser;
}

export const authenticationFeatureKey = 'authentication';

export const initialState: AuthenticationState = {
  user: null,
};

export const authenticationReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
);

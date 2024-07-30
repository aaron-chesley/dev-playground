import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.reducer';

export const selectAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');

export const selectUser = createSelector(selectAuthenticationState, (state: AuthenticationState) => state.user);

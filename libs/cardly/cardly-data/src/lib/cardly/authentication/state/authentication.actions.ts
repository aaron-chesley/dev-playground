import { createAction, props } from '@ngrx/store';
import { CardlyUser } from '@playground/cardly-util';

export const login = createAction('[Authentication] Login', props<{ displayName: string }>());
export const loginSuccess = createAction('[Authentication] Login Success', props<{ user: CardlyUser }>());
export const loginFailure = createAction('[Authentication] Login Failure');

export const logout = createAction('[Authentication] Logout');
export const logoutSuccess = createAction('[Authentication] Logout Success');
export const logoutFailure = createAction('[Authentication] Logout Failure');

export const connectToSocket = createAction('[Authentication] Connect to Socket');
export const disconnectFromSocket = createAction('[Authentication] Disconnect from Socket');

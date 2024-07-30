import { createAction, props } from '@ngrx/store';
import { CardlyUser } from '@playground/cardly-util';

export const login = createAction('[Authentication] Login', props<{ displayName: string }>());
export const loginSuccess = createAction('[Authentication] Login Success', props<{ user: CardlyUser }>());
export const loginFailure = createAction('[Authentication] Login Failure');

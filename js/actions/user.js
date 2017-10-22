//@flow
'use-strict';
import type { Action } from './types';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const UPDATE_USER = 'UPDATE_USER'

export function userLogin (user: Object): Action {
  return {
    type: USER_LOGIN,
    user: user
  };
}


export function userLogout():Action {
  return {
    type: USER_LOGOUT,
  };
}

export function updateUser(user: any): Action{
	return {
		type: UPDATE_USER,
		user: user
	}
}

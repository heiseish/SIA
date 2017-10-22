//@flow
'use-strict';
import type { Action } from '../actions/types';
export type State = {
  name: string,
  loggedIn: boolean
};

const initialState = {
  name: '',
  loggedIn: false
};

export default function (state : State = initialState, action : Action): State {
  switch (action.type) {
    case 'USER_LOGIN':
    return {
      ...state,
      ...action.user,
      loggedIn: true
    };



    case 'USER_LOGOUT':
    return {
      ...state,
      loggedIn: false
    };

    case 'UPDATE_USER':
    return {
      ...action.user
    }


    default:
    return state;
  }

}

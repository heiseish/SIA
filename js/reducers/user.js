//@flow
'use-strict';
import type { Action } from '../actions/types';
export type State = {
  name?: string,
  id?: string,
  password?: string,
  type?:'planner' | 'supervisor' | 'staff',
};

const initialState = {};

export default function (state : State = initialState, action : Action): State {
  switch (action.type) {
    case 'USER_LOGIN':
    return {
      ...action.user
    };



    case 'USER_LOGOUT':
    //empty state
    return {};

    case 'UPDATE_USER':
    return {
      ...action.user
    }


    default:
    return state;
  }

}

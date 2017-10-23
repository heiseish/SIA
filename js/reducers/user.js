//@flow
'use-strict';
import type { Action } from '../actions/types';
export type State = {
  id?: string,
  password?: string,
  issues?: Array<any>,
  type?:'planner' | 'supervisor' | 'staff',
};

const initialState = {};

export default function (state : State = initialState, action : Action): State {
  switch (action.type) {
    case 'USER_LOGIN':
    return {
      ...state,
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

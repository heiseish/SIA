//@flow
'use-strict';
import type { Action } from '../actions/types';
export type State = {
  number: number
};

const initialState = {
  number: 0
};

export default function (state : State = initialState, action : Action): State {
  switch (action.type) {
    case 'UPDATE_TASKS':
    return {
      ...state,
      number: action.number
    };

    default:
    return state;
  }

}

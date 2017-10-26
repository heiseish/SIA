//@flow
'use-strict';
export type Action =
  { type: 'USER_LOGIN', user: Object}
    | { type: 'USER_LOGOUT'}
    | { type: 'UPDATE_USER', user: any}
    | { type: 'SWITCH_TAB', tab: 'home' | 'recent' | 'setting' | 'evaluation' }
    | { type: 'UPDATE_TASKS', number: number}

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;

//@flow
'use-strict';
export type Action =
  { type: 'USER_LOGIN', user: Object}
    | { type: 'USER_LOGOUT'}
    | { type: 'UPDATE_USER', user: any};

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;

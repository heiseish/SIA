//@flow
'use-strict';
import AppNavigator from '../AppNavigator';
import type {Action} from '../actions/types';

export type Tab = 'home' | 'notification' | 'setting';
type State = {
  tab: Tab;
};


const initialState = {
	...AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login')),
	tab: 'home'
}
export default (state: any = initialState, action: Action) => {

	switch (action.type) {
  		case 'SWITCH_TAB':
  			return {...state, tab: action.tab};

  		default:
  			const nextState = AppNavigator.router.getStateForAction(action, state);
	    	// Simply return the original `state` if `nextState` is null or undefined.
	    	return nextState || state;
	}
};






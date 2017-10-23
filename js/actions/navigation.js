//@flow
'use strict';

import type { Action } from './types';
import { NavigationActions } from 'react-navigation'

type Tab = 'home' | 'recent' | 'setting';

module.exports = {
	switchTab: (tab: Tab): Action => ({
		type: 'SWITCH_TAB',
		tab,
	}),

	navigate: (route: string, params: any = {}): Action => NavigationActions.navigate({
		routeName: route,
		params: params,
	}),

	reset: (): Action => NavigationActions.reset({
		index: 0,
		actions: [
		NavigationActions.navigate({ routeName: 'Login'})
		]
	}),

	back: (routeName : string): Action => NavigationActions.back({
		key: routeName ? routeName : undefined
	})


};

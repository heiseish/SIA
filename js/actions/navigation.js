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
};

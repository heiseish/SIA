//@flow
'use strict';

import type { Action } from './types';

type Tab = 'home' | 'notification' | 'setting';

module.exports = {
  switchTab: (tab: Tab): Action => ({
    type: 'SWITCH_TAB',
    tab,
  })
};

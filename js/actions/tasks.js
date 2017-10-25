//@flow
'use-strict';
import type { Action } from './types';

export const UPDATE_TASKS = 'UPDATE_TASKS';

export function updateTasks (number: number): Action {
  return {
    type: UPDATE_TASKS,
    number: number
  };
}



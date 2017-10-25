//@flow
'use-strict';
import { combineReducers } from 'redux';
import user from './user'
import navigation from './navigation'
import tasks from './tasks'
export default combineReducers({
  user,
  nav: navigation,
  tasks
});

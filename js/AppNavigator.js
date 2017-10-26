//@flow
'use-strict';

import { StackNavigator } from 'react-navigation';
import Login from './components/login';
import Planner from './components/planner/';
import Staff from './components/staff';
import NewTask from './components/planner/taskForm'
import Supervisor from './components/supervisor'
import Assign from './components/supervisor/assign'

const AppRouteConfigs = {
  Login: {
    screen: Login
  },
  // Planner specific
  Planner: {
  	screen: Planner
  },
  NewTask: {
    screen: NewTask
  },
  // Staf specific
  Staff: {
    screen: Staff
  },

  //Supervisor specific
  Supervisor: {
    screen: Supervisor
  },
  Assign: {
    screen: Assign
  }

}

const StackNavigatorConfig = {
  initialRouteName: 'Login',
  header: null,
  headerMode: 'none',
  navigationOptions: {
    header: null
  }

}
export default StackNavigator(AppRouteConfigs, StackNavigatorConfig);

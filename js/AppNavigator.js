//@flow
'use-strict';

import { StackNavigator } from 'react-navigation';
import Login from './components/login';
import Planner from './components/planner/';
import Staff from './components/staff/Staff';

const AppRouteConfigs = {
  Login: {
    screen: Login
  },
  Planner: {
  	screen: Planner
  },
  Staff: {
    screen: Staff
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

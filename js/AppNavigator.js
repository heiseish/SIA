//@flow
'use-strict';

import { StackNavigator } from 'react-navigation';
import Login from './components/login';
import Planner from './components/planner/'

const AppRouteConfigs = {
  Login: {
    screen: Login
  },
  Planner: {
  	screen: Planner
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
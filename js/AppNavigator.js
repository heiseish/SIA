//@flow
'use-strict';

import { StackNavigator } from 'react-navigation';
import Login from './components/login';

const AppRouteConfigs = {
  Login: {
    screen: Login
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
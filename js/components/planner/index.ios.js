//@flow
'use strict';
var React = require('React');
var TabBarIOS = require('TabBarIOS');
var TabBarItemIOS = require('TabBarItemIOS');
// var unseenNotificationsCount = require('./notifications/unseenNotificationsCount');
var { switchTab } = require('../../actions');
var { connect } = require('react-redux');
import { primary, secondary } from '../common/color';
import HomeView from './home';
import NotificationView from './notification';
import SettingView from './setting';
type Tab = 'home' | 'notification' | 'setting';

class TabView extends React.Component {
  props: {
    tab: Tab;
    onTabSelect: (tab: Tab) => void;
    navigation: any;
  };

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
  }

  render() {
    return (
      <TabBarIOS tintColor={secondary.normal}>
        <TabBarItemIOS
          title="Home"
          selected={this.props.tab === 'home'}
          onPress={this.onTabSelect.bind(this, 'home')}
          systemIcon="featured">
          <HomeView
            navigation={this.props.navigation}
          />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Notifications"
          selected={this.props.tab === 'notification'}
          onPress={this.onTabSelect.bind(this, 'notification')}
          systemIcon="recents">
          <NotificationView
            navigation={this.props.navigation}
          />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Setting"
          selected={this.props.tab === 'setting'}
          onPress={this.onTabSelect.bind(this, 'setting')}
          systemIcon="more">
          <SettingView
            navigation={this.props.navigation}
          />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }

}
const mapStateToProps = (store) =>  ({
  tab: store.nav.tab,
  // notificationsBadge: unseenNotificationsCount(store) + store.surveys.length,

});

const mapDispatchToProps = (dispatch) => ({
  onTabSelect: (tab) => dispatch(switchTab(tab)),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(TabView);

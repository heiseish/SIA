//@flow
'use strict';

var React = require('React');
var View = require('View');
var StyleSheet = require('StyleSheet');
var TouchableOpacity = require('TouchableOpacity');
var Image = require('Image');
import { Text } from 'native-base'
var MenuItem = require('./MenuItem');
// var unseenNotificationsCount = require('./notifications/unseenNotificationsCount');
var { switchTab } = require('../../actions');
var { connect } = require('react-redux');

import type {Tab} from '../../reducers/navigation';

class TabView extends React.Component {
  props: {
    tab: Tab;
    onTabSelect: (tab: Tab) => void;
    navigation: this.props.navigation;
  };

  constructor(props) {
    super(props);
    this.renderNavigationView = this.renderNavigationView.bind(this);
  }

  getChildContext() {
    return {
      hasUnreadNotifications: this.props.notificationsBadge > 0,
    };
  }

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
    this.refs.drawer.closeDrawer();
  }


  renderNavigationView() {

    if (this.props.user.isLoggedIn) {
      var name = this.props.user.name || '';
      accountItem = (
        <View>
          <TouchableOpacity onPress={this.openProfileSettings}>
            <ProfilePicture userID={this.props.user.id} size={80} />
          </TouchableOpacity>
          <Text style={styles.name}>
            {name.toUpperCase()}
          </Text>
        </View>
      );
      myF8Item = (
        <MenuItem
          title="My F8"
          selected={this.props.tab === 'my-schedule'}
          onPress={this.onTabSelect.bind(this, 'my-schedule')}
          icon={require('./schedule/img/my-schedule-icon.png')}
          selectedIcon={require('./schedule/img/my-schedule-icon-active.png')}
        />
      );
    } else {
      accountItem = (
        <View>
          <Image source={require('./img/logo.png')} />
          <Text style={styles.name}>
            APRIL 12 + 13 / SAN FRANCISCO
          </Text>
        </View>
      );
      loginItem = (
        <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>
            Log in to find your friends at F8.
          </Text>
          <LoginButton source="Drawer" />
        </View>
      );
    }
    return (
      <View style={styles.drawer}>
        <MenuItem
          title="Schedule"
          selected={this.props.tab === 'schedule'}
          onPress={this.onTabSelect.bind(this, 'schedule')}
          icon={scheduleIcon}
          selectedIcon={scheduleIconSelected}
        />
        {myF8Item}
        <MenuItem
          title="Maps"
          selected={this.props.tab === 'map'}
          onPress={this.onTabSelect.bind(this, 'map')}
          icon={require('./maps/img/maps-icon.png')}
          selectedIcon={require('./maps/img/maps-icon-active.png')}
        />
        <MenuItem
          title="Notifications"
          selected={this.props.tab === 'notifications'}
          onPress={this.onTabSelect.bind(this, 'notifications')}
          badge={this.props.notificationsBadge}
          icon={require('./notifications/img/notifications-icon.png')}
          selectedIcon={require('./notifications/img/notifications-icon-active.png')}
        />
        <MenuItem
          title="Info"
          selected={this.props.tab === 'info'}
          onPress={this.onTabSelect.bind(this, 'info')}
          icon={require('./info/img/info-icon.png')}
          selectedIcon={require('./info/img/info-icon-active.png')}
        />
        {loginItem}
      </View>
    );
  }

  renderContent() {
    switch (this.props.tab) {
      case 'schedule':
        return (
          <GeneralScheduleView
            navigator={this.props.navigator}
          />
        );

      case 'my-schedule':
        return (
          <MyScheduleView
            navigator={this.props.navigator}
            onJumpToSchedule={() => this.props.onTabSelect('schedule')}
          />
        );

      case 'map':
        return <F8MapView />;

      case 'notifications':
        return <F8NotificationsView navigator={this.props.navigator} />;

      case 'info':
        return <F8InfoView navigator={this.props.navigator} />;
    }
    throw new Error(`Unknown tab ${this.props.tab}`);
  }

  render() {
    return (
      <F8DrawerLayout
        ref="drawer"
        drawerWidth={290}
        drawerPosition="left"
        renderNavigationView={this.renderNavigationView}>
        <View style={styles.content} key={this.props.tab}>
          {this.renderContent()}
        </View>
      </F8DrawerLayout>
    );
  }
}

F8TabsView.childContextTypes = {
  openDrawer: React.PropTypes.func,
  hasUnreadNotifications: React.PropTypes.number,
};

function select(store) {
  return {
    tab: store.navigation.tab,
    day: store.navigation.day,
    user: store.user,
    notificationsBadge: unseenNotificationsCount(store) + store.surveys.length,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchTab(tab)),
    logOut: () => dispatch(logOutWithPrompt()),
  };
}

var styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    justifyContent: 'flex-end',
  },
  name: {
    marginTop: 10,
    color: 'white',
    fontSize: 12,
  },
  loginPrompt: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  loginText: {
    fontSize: 12,
    color: F8Colors.lightText,
    textAlign: 'center',
    marginBottom: 10,
  },
});

module.exports = connect(select, actions)(F8TabsView);

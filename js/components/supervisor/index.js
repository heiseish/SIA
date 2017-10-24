//@flow
'use strict';
var React = require('React');
var TabBarIOS = require('TabBarIOS');
var TabBarItemIOS = require('TabBarItemIOS');
// var unseenNotificationsCount = require('./notifications/unseenNotificationsCount');
var { switchTab } = require('../../actions');
var { connect } = require('react-redux');
import { primary, secondary, Header } from '../common';
import HomeView from './home';
import HistoryView from './history';
import SettingView from './setting';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Badge, StyleProvider } from 'native-base';

type Tab = 'home' | 'recent' | 'setting';

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
      
        <Container>
          {this.renderSelectedTab()}
          <Footer>
            <FooterTab>
              <Button vertical badge
                  active={this.props.tab === 'home'} 
                  onPress={() => this.onTabSelect('home')} >
                  <Badge ><Text>2</Text></Badge>
                <Icon name={this.props.tab === 'home' ? "ios-home" : "ios-home-outline"} 
                active={this.props.tab === 'home'}
                />
                <Text>Home</Text>
              </Button>


              <Button vertical
                  active={this.props.tab === 'recent'} 
                  onPress={() => this.onTabSelect('recent')} >
                <Icon name={this.props.tab === 'recent' ? 'ios-notifications' : "ios-notifications-outline" }
                active={this.props.tab === 'home'}/>
                <Text>Recent</Text>
              </Button>


              <Button vertical badge
                  active={this.props.tab === 'setting'} 
                  onPress={() => this.onTabSelect('setting')} >
                  <Badge ><Text>4</Text></Badge>
                <Icon name={this.props.tab === 'setting' ? 'ios-settings' : "ios-settings-outline"}
                active={this.props.tab === 'home'}/>
                <Text>Setting</Text>
              </Button>

            </FooterTab>
          </Footer>
        </Container>
    );
  }

  renderSelectedTab() {
    switch (this.props.tab) {
      case 'home':
      return <HomeView navigation={this.props.navigation}/>

      case 'recent':
      return <HistoryView navigation={this.props.navigation}/>

      default:
      return <SettingView navigation={this.props.navigation}/>
    }
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

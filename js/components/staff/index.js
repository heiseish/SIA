//@flow
'use-strict';
import React, { Component } from 'react';
import {  FlatList } from 'react-native';
import { Container, Text, View, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base';
import { connect } from 'react-redux';
import TaskView from './tasks'
import { switchTab } from '../../actions/navigation'
import SettingView from './settings'
import type Tab from '../../reducers'

class Staff extends Component {
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
        //params should contains user_name, user_id
        //fetch data from database to see the list of tasks one has to do
        return (
            <Container>
                {this.renderContent()}
                <Footer>
                    <FooterTab>
                        <Button vertical badge
                          active={this.props.tab === 'home'} 
                          onPress={() => this.onTabSelect('home')} >
                          <Badge ><Text>2</Text></Badge>
                            <Icon name={this.props.tab === 'home' ? "ios-paper" : "ios-paper-outline"} 
                            active={this.props.tab === 'paper'}
                            />
                            <Text>Tasks</Text>
                          </Button>

                        <Button vertical
                          active={this.props.tab === 'setting'} 
                          onPress={() => this.onTabSelect('setting')}>
                        <Icon name={this.props.tab === 'setting' ? 'ios-settings' : "ios-settings-outline"}
                        active={this.props.tab === 'home'}/>
                        <Text>Setting</Text>
                      </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
    renderContent() {
        switch (this.props.tab) {
          case 'home':
          return <TaskView navigation={this.props.navigation}/>

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

module.exports = connect(mapStateToProps, mapDispatchToProps)(Staff);

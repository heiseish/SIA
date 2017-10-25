//@flow
'use-strict';
import React, { Component } from 'react';
import {  FlatList } from 'react-native';
import { Container, Text, View, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base';
import { connect } from 'react-redux';
import TaskView from './tasks'
import { switchTab, userLogin } from '../../actions'
import SettingView from './settings'
import type Tab from '../../reducers'
import firebase from '../../model'

type Props = {
  tab: Tab,
  onTabSelect: (tab: Tab) => void,
  navigation: any,
  user: any,
  userLogin: (any) => void,
  tasks: number
};

class Staff extends Component {
  props: Props;
  userRef: any;

  constructor(props) {
    super(props)
    this.userRef = firebase.database().ref(`staff/${this.props.user.id}`)

  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForStaffStatus(this.userRef);
  }

  /**
  * Listen for changes in staff status
  */
  listenForStaffStatus = (userRef: any) => {
    userRef.on("child_changed", (snapshot) => {
      let newUser = this.props.user
      newUser[snapshot.key] = snapshot.val()
      this.props.userLogin(newUser)
    });
  }

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
                        <Button vertical badge={this.props.tasks ? true : false}
                          active={this.props.tab === 'home'} 
                          onPress={() => this.onTabSelect('home')} >
                          {this.props.tasks ? <Badge ><Text>{this.props.tasks}</Text></Badge> : null}
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
  user: store.user,
  tab: store.nav.tab,
  tasks: store.tasks.number
  // notificationsBadge: unseenNotificationsCount(store) + store.surveys.length,

});

const mapDispatchToProps = (dispatch) => ({
  onTabSelect: (tab) => dispatch(switchTab(tab)),
  userLogin: (user: any) => dispatch(userLogin(user))
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Staff);

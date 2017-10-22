//@flow
'use-strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View,  Icon } from 'native-base';
import {Alert} from 'react-native';
import { userLogin} from '../../actions/user';
import styles from './styles';
import {alert, Button, primary} from '../common/'

@connect(null,(dispatch => ({
  userLogin: (user: any) => dispatch(userLogin(user))
})))
export default class Footer extends Component {
  ggSignIn = () => {
    // this.props.load()
    // googleSignIn().then(res => {
    //   this.props.load()
    //   this.props.userLogin(res);
    //   Actions['home']()
    // }).catch(err => {
    //   this.props.load()
    //   if (err !== null) 
    //     alert(err.message)
    // })

  }
  fbSignIn = () => {
    // this.props.load()
    // facebookSignIn().then(res => {
    //   this.props.load()
    //   this.props.userLogin(res);
    //   Actions['home']()
    // }).catch(err => {
    //   this.props.load()
    //   if (err !== null) 
    //     alert(err.message)
    // })
  }
  // ttSignIn = () => {
  //   this.props.load()
  //   twitterSignIn().then(res => {
  //     // this.props.load()
  //     // this.props.userLogin(res);
  //     // Actions['home']()
  //   }).catch(err => {
  //     this.props.load()
  //     if (err !== null) 
  //       alert(err.message)
  //   })
  // }

  shouldComponentUpdate(){
    return false
  }
  render() {
    return (
      <View style={styles.logos}>
        <Button color={primary.normal} style={styles.logobtn} onPress={() => this.fbSignIn()}>
          <Icon name='logo-facebook' style={styles.logoIcon}/>
        </Button>

        <Button color={primary.normal} style={styles.logobtn} onPress={() => this.ggSignIn()}>
          <Icon name='logo-google' style={styles.logoIcon}/>
        </Button>

        {/*<Button color="rgb(59,89,152)" style={styles.logobtn} onPress={() => this.ttSignIn()}>
          <Icon name='logo-twitter' style={styles.logoIcon}/>
        </Button>*/}
      </View>
    );
  }
}


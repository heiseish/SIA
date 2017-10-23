//@flow
'use-strict'
import React, { Component } from 'react';
import { Image, View, StatusBar ,TextInput} from 'react-native';
import { connect } from 'react-redux';
import { Container, Toast, Content, Icon, Item, Label, Input, Button, Text} from 'native-base';
import { alert} from '../../common'
import styles from './styles';
var _ = require('lodash/core')

type Props = {
  subject: string,
  field: string,
  color: string,
  setFeedbackSubject: () => void,
  setFeedbackField: () => void
};
type State = {
  subject: string,
  text: string,
  loading: boolean
};

export default class Setting extends Component {

  render() {
    return (
      <Container>  
        <Content keyboardShouldPersistTaps="always">
          <Button style={{alignSelf: 'center', marginTop: 100}} 
          onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Log Out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


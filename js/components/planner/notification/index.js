//@flow
'use-strict'
import React, { Component } from 'react';
import { Image, View, StatusBar ,TextInput} from 'react-native';
import { connect } from 'react-redux';
import { Container, Toast, Content, Icon, Item, Label, Input} from 'native-base';
import {Text, Button, Header, alert} from '../../common'
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

export default class Feedback extends Component {

  render() {
    return (
      <Container>  
        <Content keyboardShouldPersistTaps="always">
        <Text>Hi</Text>
        </Content>
      </Container>
    );
  }
}


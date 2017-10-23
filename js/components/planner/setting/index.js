//@flow
'use-strict'
import React, { Component } from 'react';
import { Image, View, StatusBar ,TextInput} from 'react-native';
import { connect } from 'react-redux';
import { Container, Toast, Content, Icon, Item, Label, Input, Text} from 'native-base';
import { alert, Button} from '../../common'
import { reset } from '../../../actions'
import styles from './styles';
var _ = require('lodash/core')

type Props = {
  reset: () => void
};

class Setting extends Component {
  props: Props;

  render() {
    return (
      <Container>  
        <Content keyboardShouldPersistTaps="always">
          <Button 
          style={{
            alignSelf: 'center', 
            marginTop: 100,
            height: 40,
            width: 100,
            borderRadius: 50}} 
          onPress={() => this.props.reset()}>
            <Text>Log Out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset())
})
export default connect(null, mapDispatchToProps)(Setting);


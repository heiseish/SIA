//@flow
'use-strict'
import React, { Component } from 'react';
import { View} from 'react-native';
import { connect } from 'react-redux';
import { Container,  Content, Icon, Item, Text, Right, Card, CardItem,H3, Left, Body} from 'native-base';
import { alert, Button, Header, Image} from '../../common'
import { reset } from '../../../actions'
import styles from './styles';
var _ = require('lodash/core')

type Props = {
  reset: () => void,
  user: any
};

class Setting extends Component {
  props: Props;
  static data = [
    'Start and stop the task fixing a specific defect. Only 1 task can be carried out at any time!',
    'View the defect info.',
    'The status will change to `busy` when a task is started and return to `free` when it is done!'
  ]

  render() {
    return (
      <Container>  
        <Header title="Settings"/>
        <Content keyboardShouldPersistTaps="always">
          {this.renderUser()}
          {this.renderGuide()}
          <Button 
          style={{
            alignSelf: 'center', 
            marginTop: 40,
            height: 60,
            width: 150,
            borderRadius: 50}} 
          onPress={() => this.props.reset()}
          text="Log out"
          textStyle={{color: 'white'}}
          icon="exit">
          </Button>
        </Content>
      </Container>
    );
  }

  renderUser = () => (
    <Card style={{height: 120}}>
      <CardItem header style={{flexDirection: 'row'}}>
        <Left>
          <Image circle radius={40} source={{uri: 'https://s3.amazonaws.com/FringeBucket/default-user.png'}}
          style={{borderWidth: 1, borderColor: this.props.user.status === 'busy' ? 'red' : 'green'}}/>
          <Body>
            <H3>  {this.props.user.name}</H3>
            <Text>   Staff</Text>
            <Text note>   Status:  <Text style={{color: this.props.user.status ? 'green' : 'red'}}>{this.props.user.status}</Text></Text>
          </Body>
        </Left>
        
      </CardItem>
    </Card>
  )


  renderGuide = () => (
    <Card style={{height: 270}}>
      <CardItem header>
        <Text>Basic functionalities of a Planner</Text>
      </CardItem>
      {Setting.data.map(datum => (
        <CardItem>
          <Text>- {datum}</Text>
        </CardItem>
      ))}
      <CardItem footer>
        <Text>S06P</Text>
      </CardItem>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})
const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset())
})
export default connect(mapStateToProps, mapDispatchToProps)(Setting);


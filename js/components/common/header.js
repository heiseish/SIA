//@flow
'use-strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleProvider,Button, Header,Left, Body,Title, Right, Icon} from 'native-base';
import {Platform} from 'react-native'
import {primary} from './color'
type Props = {
  title: string,
  color: string,
  iconName: string,
  routeName: string,
  handlePress: () => void
};
const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
class SIAHeader extends Component {
  props: Props;
  render() {
    let title = this.props.title || this.props.routeName 
    return (
      <Header style={{backgroundColor: primary.header}} {...this.props}>
        <Left style={{flex: 1}}>
          <Button transparent/>
        </Left>
        <Body style={{flex: 1}}>
          <Title style={{color: 'white'}}>{capitalizeFirstLetter(title)}</Title>
        </Body>

        <Right style={{flex: 1}}>
          {(this.props.hasRight) &&
          <Button transparent onPress={() =>  this.props.handlePress()}>
            <Icon name={this.props.iconName} style={{color: 'white'}} />
          </Button>}
        </Right>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.nav
});
export default connect(mapStateToProps)(SIAHeader);

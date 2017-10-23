//@flow
'use-strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleProvider,Button, Header,Left, Body,Title, Right, Icon} from 'native-base';
import { Platform} from 'react-native'
import { primary, secondary} from './color'
type Props = {
  title: string,
  iconNameLeft: string,
  iconNameRight: string,
  hasRight?: boolean,
  handlePressRight?: () => void,
  hasLeft?: boolean,
  handlePressLeft?: () => void
};
const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
* Customized Header for SIA app
* Default background color: App secondary color
* @params 
* hasLeft, hasRight: boolean -> specify whether header has icon
* iconNameLeft, iconNameRight -> specify icon name
* handlePressLeft, handlePressRight -> callback function when button is pressed
*/
class SIAHeader extends Component {
  props: Props;
  static defaultProps = {
    hasRight: false,
    hasLeft: false
  }

  render() {
    let title = this.props.title 
    return (
      <Header style={{backgroundColor: secondary.dark}} {...this.props}>
        <Left style={{flex: 1}}>
          {(this.props.hasLeft) &&
          <Button transparent onPress={() =>  this.props.handlePressLeft()}>
            <Icon name={this.props.iconNameLeft} style={{color: 'white'}} />
          </Button>}
        </Left>
        <Body style={{flex: 1}}>
          <Title style={{color: 'white'}}>{capitalizeFirstLetter(title)}</Title>
        </Body>

        <Right style={{flex: 1}}>
          {(this.props.hasRight) &&
          <Button transparent onPress={() =>  this.props.handlePressRight()}>
            <Icon name={this.props.iconNameRight} style={{color: 'white'}} />
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

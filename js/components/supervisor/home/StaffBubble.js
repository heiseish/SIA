//@flow
'use-strict'
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Image } from '../../common';

export default class StaffBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropZoneValues: null,
    }
  }

  setDropZoneValues(event) {
    this.setState({
      dropZoneValues: event.nativeEvent.layout
    });
  }

  render() {
    const staffName = this.props.name;
    return (
      <View
      style={{padding: 5, width: 80, height: 80, alignItems: 'center'}}
      onLayout={this.setDropZoneValues.bind(this)}>
        <Image
        circle
        radius={30}
        source={{uri:'https://s3.amazonaws.com/FringeBucket/default-user.png'}}
        style={{borderWidth:1, borderColor:this.props.status === 'busy' ? 'red' : 'green'}}
         />
        <View style={{height:20, width:80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View
          style={this.props.status === 'busy' ? styles.statusCircleBusy : styles.statusCircleFree}
           />
          <Text style={styles.nameLabel}>{staffName.substr(0, staffName.indexOf(' '))}</Text>
        </View>
      </View>
    );
  }
}

//@flow
'use-strict'
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Image } from '../../common';

export default class StaffCard extends Component {
  render() {
    const staffName = this.props.name;
    return (
      <View
      style={{padding: 5, width: 120, height: 100, alignItems: 'center'}}
      >
        <Image
        circle
        radius={35}
        source={{uri:'https://s3.amazonaws.com/FringeBucket/default-user.png'}}
         />
        <View style={{height:20, width:80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.nameLabel}>{staffName.substr(0, staffName.indexOf(' '))}</Text>
        </View>
      </View>
    );
  }
}

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
      <View style={{width: 100, height: 100, flexDirection: 'column'}}>
        <Image
        circle
        radius={35}
        source={{uri:'https://s3.amazonaws.com/FringeBucket/default-user.png'}}
         />
        <View style={{height:20, width:80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.nameLabel}>{staffName}</Text>
        </View>
      </View>
    );
  }
}

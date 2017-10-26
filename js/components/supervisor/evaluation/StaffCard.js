//@flow
'use-strict'
import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableHighlight } from 'react-native';
import styles from './styles';
import { Image } from '../../common';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class StaffCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const staffName = this.props.name;
    return (
      <TouchableHighlight
      style={{padding:5,height:70,width:deviceWidth}}
      activeOpacity={50}
      underlayColor={'darkgray'}
      onPress={this.props.onClick}
      >
        <View
        style={{height:70,width:deviceWidth,justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}
        >
          <Image
          circle
          radius={30}
          source={{uri:'https://s3.amazonaws.com/FringeBucket/default-user.png'}}
          style={{borderWidth:1, borderColor:this.props.status === 'busy' ? 'red' : 'green'}}
           />
          <View style={{paddingLeft: 40, paddingBottom: 5, height:20, width:100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.nameLabel}>{staffName.substr(0, staffName.indexOf(' '))}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

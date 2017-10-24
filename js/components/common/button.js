//@flow
'use strict';
import { LinearGradient } from 'expo';
import React, { Component } from 'react';
var StyleSheet = require('StyleSheet')
import { View ,Image, TouchableOpacity, Platform} from 'react-native';
import { Text , Icon } from 'native-base'
import { primary, secondary } from './color';

export default class Button extends Component {
  render() {
    let onPress = this.props.onPress || null
    let onLongPress = this.props.onLongPress || null
    let color = this.props.color || primary.normal
    let rate = this.props.rate || 0.5
    return (
      <TouchableOpacity
        accessibilityTraits="button"
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
        activeOpacity={0.8}
        >
        <LinearGradient
          colors={[color, 
            shadeColor2(color, rate)]}
          style={{ ...this.props.style, justifyContent: 'center', alignItems:'center', flexDirection: 'row'}}>
          {this.props.icon  ? <Icon active={this.props.active} name={this.props.icon} 
          style={{color: 'white', backgroundColor:'transparent', marginRight: 10, ...this.props.iconStyle}}/> : null}
          {this.props.children || <Text style={[styles.buttonText, this.props.textStyle]}>
            {this.props.text}
          </Text>}
        </LinearGradient>
     </TouchableOpacity>
    );
  }
}

const  shadeColor2 = (color: string, percent: number) => {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

const blendColors = (c0: string, c1: string, p: number) => {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}


var styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems:'center'
  },
  buttonText: {
    fontFamily: (Platform.OS === 'ios') ? 'Gill Sans' : 'sans-serif-light',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
  },
});


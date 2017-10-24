//@flow
'use strict';
import React, { Component } from 'react';
import { Image } from 'react-native';
const loading = require('./img/loading.jpg');
export default class SIAImage extends Component {
  props: {
    radius?: number;
    source: {uri: string} | any;
    style?: any;
  };

  render() {
    let size
    if (this.props.radius)
      size = this.props.radius * 2
    else size = 74
    return (
      <Image
        style={this.props.circle ?
          {
            ...this.props.style,
            height: size,
            width: size,
            borderRadius: size/2
          } : this.props.style}
          source={
            this.props.source.uri ? { uri: this.props.source.uri} : this.props.source
          }
          defaultSource={loading}
      />
    );
  }
}

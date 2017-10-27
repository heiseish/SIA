//@flow
'use-strict'
import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('window').width
export default {
  nameLabel: {
    padding: 4,
    width: 100,
    fontSize: 17,
    fontWeight: '400'
  },
  label: {
    marginLeft: 32
  },
  button: {
    width: 190,
    height: 50,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10
  },
  rating: {
  	width: width - 100,
  	alignSelf: 'center'
  }
};

//@flow
'use-strict'
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;
import { secondary } from '../../common/';
const deviceHeight = Dimensions.get('window').height;

export default {
  listItem: {
    height: 100,
    marginLeft: -1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5
  }
};

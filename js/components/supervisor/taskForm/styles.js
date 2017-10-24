//@flow
'use-strict'
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;
import { secondary } from '../../common/';
const deviceHeight = Dimensions.get('window').height;

export default {
  label: {
    marginLeft: 32
  },

  button: {
  	borderColor: secondary.normal,
  	width: 100,
  	height: 100,
  	alignSelf: 'center',
  	justifyContent: 'center',
  	flexDirection: 'column'
  },
  buttonIcon: {
  	fontSize: 40,
  	color: secondary.normal
  },
  buttonText: {
  	color: secondary.normal
  },
  upload: {
  	marginTop: 20,
  	width: Dimensions.get('window').width,
  	height: 150,
  	flexDirection: 'column',
  	justifyContent: 'space-between'
  }
};

'use-strict'
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    flex: 1
  },
  text : {
    alignSelf: 'center',
    color: '#000099'
  },
  subject: {
    height: 40,
    // borderColor: 'green',
    borderWidth: 1,
    marginTop: 20
  },
  textInput: {
    height: 300,
    // borderColor: 'green',
    borderWidth: 1,
    marginTop: 20
  },
  btn: {
    width: 300,
    height: 50,
    borderRadius: 150,
    alignSelf:'center',
    alignItems: 'center',
    marginTop: 5
  },
  label: {
    fontSize: 15, 
    fontWeight: 'bold'
  }
};

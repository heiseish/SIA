'use-strict';
const React = require('react-native');
import {Platform} from 'react-native'
const { StyleSheet, Dimensions } = React;
import {primary} from '../common'
let ios = Platform.OS === 'ios'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default {
  inputGroup: {
    // position: 'absolute',
    // top: 230,
    marginTop: 20,
    marginLeft: 50,
    width: width - 100,
  },
  upper: {
    marginTop: -120,
    width: width,
    height: ios ? height/1.9 : height/3 - 50,
    backgroundColor: 'white'
  },
  bg: {
    flex: 1,
    resizeMode: 'contain',
    width: width,
    height: ios ? height/2.5 : height/3 - 50,
    marginBottom: -60
  },
  input: {
    marginBottom: 20,
  },
  loginButton: { //avoide using top for native-base button
    // marginTop: 15,
    // paddingTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 100,
    height: 50,
    borderRadius: 75,
    //backgroundColor: 'rgb(59,89,152)',
    // borderColor: 'rgb(59,89,152)',
    alignItems: 'center',
    // position: 'absolute'
  },
  signUpText :{
    // marginTop: 30,
    // alignSelf: 'center',
    // padding: 50,
    margin: 20,
    // fontSize: 16,
    color: primary.normal,
    marginLeft: 30
  },
  icon:{
    color: primary.normal
  },
  btnsuccess: {
    color:'green',
  },
  btnerror: {
    color: 'red',
  },
  btninactive: {
    color: 'transparent',
  },
  warningMessage : {
    fontSize: 12,
    top: 60,
    color: 'red',
  },
  text: {
    color: primary.normal,
    marginLeft: 30,
  },
  bottomHalf: {
    // position: 'absolute',
    // bottom: 160
    marginTop: 20
  },
  helpText: {
    width: 150
  },
  helpArea: {
    width: width,
    flexDirection: 'row', 
    marginTop: 30
  },
  pickerArea: {
    height: 50,
    flexDirection: 'row'
  },
  pickerHolder: {
    height: 50,
    borderRadius: (width - 100) / 2,
    backgroundColor: 'white',
    borderColor: primary.normal,
    borderWidth: 1,
    flex: 90
  },
  picker: {
    height: 50,

  },
  pickerItem: {
    height: 50,
    color: primary.normal
  }
};

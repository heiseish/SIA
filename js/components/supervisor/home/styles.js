//@flow
'use-strict'
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;
import { primary, secondary } from '../../common'
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
let CIRCLE_RADIUS = 36;

export default {
  listItem: {
    height: 100
  },
  listHeader: {
  	height: 60,
  	marginLeft: -20,
  	width: Dimensions.get('window').width + 20,
  	flexDirection: 'row',
  	padding: 20
  },
  priorityColorIndicator: {
    height: 100,
    width: 5,
  },
  priorityIndicator: {
    marginTop: 20,
    marginLeft: 20,
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: primary.normal,
    borderWidth: 1
  },
  underPriorityText: {
    color: primary.normal,
    marginLeft: 20
  },
  priorityText: {
  	backgroundColor: 'transparent',
  	// fontSize: 30,
  	alignSelf: 'center',
  	color: primary.normal,
  },
  defectName: {
  	fontSize: 25,
  	fontWeight: '400'
  },
  modal: {
    width: deviceWidth,
    height: 500,
  },
  info: {
    fontStyle:'italic',
    fontWeight: '400'
  },
  priority: {
    flexDirection: 'column'
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 10
  },
  statusCircleBusy: {
    backgroundColor: 'red',
    width: 8,
    height: 8,
    borderRadius: 4
  },
  statusCircleFree: {
    backgroundColor: 'green',
    width: 8,
    height: 8,
    borderRadius: 4
  },
  nameLabel: {
    padding: 4,
    width: 50
  },
  draggableContainer: {
    position    : 'absolute',
    top         : deviceHeight/2 - CIRCLE_RADIUS,
    left        : deviceWidth/2 - CIRCLE_RADIUS,
  },
  circle      : {
    backgroundColor     : '#1abc9c',
    width               : CIRCLE_RADIUS*2,
    height              : CIRCLE_RADIUS*2,
    borderRadius        : CIRCLE_RADIUS
  },
  text        : {
    marginTop   : 25,
    marginLeft  : 5,
    marginRight : 5,
    textAlign   : 'center',
    color       : '#fff'
  }
};

//@flow
'use-strict'
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;
import { primary, secondary } from '../../common'
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  listItem: {
    height: 100
  },
  listHeader: {
    height: 55,
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
    fontSize: 18,
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
  }
};

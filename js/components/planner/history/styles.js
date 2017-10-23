'use-strict'
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;

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
  priorityIndicator: {
    marginTop: 10,
    marginLeft: 20,
    height: 40,
    width: 40, 
    borderRadius: 20,
  },
  priorityText: {
    backgroundColor: 'transparent',
    fontSize: 30,
    alignSelf: 'center',
    color: 'white',
    left: -5
  },
  defectName: {
    fontSize: 25,
    fontWeight: '400'
  },
};

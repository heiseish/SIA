//@flow
'use-strict';
import {  Dimensions } from 'react-native';
import { primary, secondary } from '../../common'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default {
  incompleteCard: {
    height: 50,
    width: screenWidth - 30,
    borderRadius: 20,
    backgroundColor: 'lightpink',
    borderWidth: 1,
    borderColor: 'crimson',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center'
  },
  completeCard: {
    height: 50,
    width: screenWidth - 30,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'lightgreen',
    borderColor: 'forestgreen',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center'
  },
  incompleteCardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkred'
  },
  completeCardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkgreen'
  },
  progressBarLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primary.normal
  },
  listItem: {
    height: 100,
    width: screenWidth,
    marginLeft: -1
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
    fontSize: 20,
    fontWeight: '400'
  },
  modal: {
    width: screenWidth,
    height: screenHeight,
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
  header: {
    marginTop: 10, 
    marginBottom: 10,
    height: 30, 
    width: screenWidth - 80,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

}

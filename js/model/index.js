//@flow
'use-strict';
import RNFirebase from 'react-native-firebase';

const configurationOptions = {
  // debug: true
  // persistence: true
};

export default RNFirebase.initializeApp(configurationOptions);


//@flow
'use strict';
import React from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

function SIATouchableIOS(props: Object): ReactElement {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor="#3C5EAE"
      {...props}
    />
  );
}

const SIATouchable = Platform.OS === 'android'
  ? TouchableNativeFeedback
  : SIATouchableIOS;

module.exports = SIATouchable;

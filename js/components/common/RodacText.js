//@flow
'use strict';
import React from 'react';
import ReactNative, {StyleSheet, Dimensions, Platform} from 'react-native';
export function Text({style, ...props}: Object): ReactElement {
  let note = props.note ? styles.note : null
  return <ReactNative.Text style={[styles.font, style, note]} {...props} />;
}
export function Heading1({style, ...props}: Object): ReactElement {
  let note = props.note ? styles.note : null
  return <ReactNative.Text style={[styles.font, styles.h1, style, note]} {...props} />;
}

export function Paragraph({style, ...props}: Object): ReactElement {
  let note = props.note ? styles.note : null
  return <ReactNative.Text style={[styles.font, styles.p, style, note]} {...props} />;
}

const scale = Dimensions.get('window').width / 375;
function normalize(size: number): number {
  return Math.round(scale * size);
}
const styles = StyleSheet.create({
  font: {
    marginTop: 5
  },
  note: {
    fontWeight: '100',
    fontSize: normalize(13)
  },
  h1: {
    fontSize: normalize(30),
    lineHeight: normalize(30),
    fontWeight: '300',
    letterSpacing: -1,
  },
  p: {
    fontSize: normalize(18),
    lineHeight: normalize(26),
  },
});

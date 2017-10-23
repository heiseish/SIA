import React from 'react';
import SetUp from './js/setup';
import Staff from './staff/staff';

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
        <SetUp />
    );
  }
}

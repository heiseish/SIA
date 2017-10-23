//@flow
'use-strict';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import AppWithNavigationState from './App';

type State = {
  isLoading: boolean,
  store: any
};

export default class SetUp extends React.Component {
  state: State;
  
  constructor() {
    super();
    (this:any).state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }
  render() {
    if (this.state.isLoading) {
        return null;
    }
    return (
      <Provider store={this.state.store}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}
//@flow
'use-strict';
import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './AppNavigator';
import { Root, StyleProvider } from 'native-base'
import { connect } from 'react-redux';
import getTheme from '../native-base-theme/components';

class App extends React.Component {
  render() {
    return (
      <StyleProvider  style={getTheme()}>
        <Root>
          <AppNavigator navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
          })} />
        </Root>
      </StyleProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});
export default connect(mapStateToProps)(App);

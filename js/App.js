//@flow
'use-strict';
import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './AppNavigator';
import { Root } from 'native-base'
import { connect } from 'react-redux';


class App extends React.Component {
  render() {
    return (
      <Root>
        <AppNavigator navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })} />
      </Root>
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});
export default connect(mapStateToProps)(App);

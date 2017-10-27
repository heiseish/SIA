//@flow
'use-strict'
import React, { Component } from 'react';
import { } from 'react-native';
import { connect } from 'react-redux';
import { Container, View, Content, Icon, List, ListItem, Text, Left, Button, Body, Right, Tabs, Tab, TabHeading } from 'native-base';
import { Header, primary, secondary} from '../../common'
import firebase from '../../../model/'
import styles from './styles';
import Modal from 'react-native-modalbox'
import InfoCard from './infoHistory'
import { navigate } from '../../../actions'
import Present from './present'
import Done from './done'
import OverheadTab from './overheadTab'
var ScrollableTabView = require('react-native-scrollable-tab-view');

type Issue = {
  name: string,
  priority: number,
  status: string,
  creator: string,
  id: string,
  image:? string
};
type Props = {
  navigation: any
};
type State = {
  selected: {} | Issue,
  tabs: Array<{name: string}>
};

/**
* Recent View for Supervisor. Display list of defects that have been assigned and done.
*/
export default class History extends Component {
  state: State;
  ds:any;
  props: Props;
  defectsRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: {},
      tabs: [
        {
          name: 'Assigned and Ongoing'
        },
        {
          name: 'Unchecked!'
        }
      ],
    };
  }

  _openModal(data: Issue) {
    this.setState({selected: data})
    this.refs.modal.open()
  }

  render() {
    return (
        <Container>
         <ScrollableTabView 
         style={{marginTop: 20, }}
        renderTabBar={() => <OverheadTab />}>
          <Present tabLabel="paper" openModal={(data) => this._openModal(data)} navigation={this.props.navigation}/>
          <Done tabLabel="done-all" />
        </ScrollableTabView>

        <Modal
          style={styles.modal}
          ref={"modal"}
          swipeToClose={true}>
            <InfoCard defect={this.state.selected} 
            close={() => this.refs.modal.close()}/>
        </Modal>

        </Container>
      );
  }
}


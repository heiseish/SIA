//@flow
'use-strict'
import React, { Component } from 'react';
import { View, StatusBar , TextInput, ListView, FlatList, Dimensions, PanResponder, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Icon, List, ListItem, Text, Left, Button, Body, Right } from 'native-base';
import { alert, Header, Button as Btn, primary, Image} from '../../common'
import firebase from '../../../model'
import { deleteTask } from '../../../model/query/'
import { navigate } from '../../../actions'
import styles from './styles'
import Modal from 'react-native-modalbox'
import InfoCard from '../infoCard'
import StaffCard from './StaffBubble'
var _ = require('lodash/core')

type Props = {
  reset: () => void,
  user: any
};

class EvaluationView extends Component {

  staffRef: any;

  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      staffData: [],
    };
    this.staffRef = firebase.database().ref('staff');
  }

  /**
  * Listen for changes in staff lists on database
  */
  listenForStaff(staffRef: any) {
    staffRef.on('value', (dataSnapshot) => {
      var updatedStaff = [];
      dataSnapshot.forEach((staff) => {
        updatedStaff.push(staff.val());
      });
      this.setState({
        staffData: updatedStaff
      });
    });
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForStaff(this.staffRef);
  }

  openModalBox = () => {
    this.refs.modal.open();
  }

  openStaffInfo = (staffId) => {
    const cloneStaff = this.state.staffData;
    var i;
    for (i = 0; i < cloneStaff.length; i++) {
      if (cloneStaff[i].id === staffId) {
        this.setState((prev) => ({
          selected: cloneStaff[i],
          staffData: prev.staffData
        }), () => this.openModalBox());
        break;
      }
    }
  }

  staffKeyExtractor = (item, index) => item.id;

  renderStaffRow = ({item}) => (
    <StaffCard name={item.name} onClick={() => this.openStaffInfo(item.id)} />
  );

  render() {
    return (
      <View style={{flex: 1}}>
        <Header title="Evaluation" />
        <Content>
          <FlatList
            data={this.state.staffData}
            keyExtractor={this.staffKeyExtractor}
            renderItem={this.renderStaffRow.bind(this)}
           />
        </Content>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route: string, params: any) => dispatch(navigate(route, params))
})
export default connect(null, mapDispatchToProps)(Home);

//@flow
'use-strict'
import React, { Component } from 'react';
import { Image, View, StatusBar , TextInput, ListView, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Icon, List, ListItem, Text, Left, Button, Body, Right } from 'native-base';
import { alert, Header, Button as Btn, primary} from '../../common'
import firebase from '../../../model/'
import styles from './styles';
import Modal from 'react-native-modalbox'
import InfoCard from '../infoCard'
import { navigate } from '../../../actions'
var _ = require('lodash/core')

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
  data: Array<Issue>,
  selected: {} | Issue
};

/**
* Recent View for Planner. Display list of defects that have bene attended to.
*/
class History extends Component {
  state: State;
  ds:any;
  props: Props;
  defectsRef: any;

  constructor(props: Props) {
    super(props);
    this.defectsRef = firebase.database().ref('defects');
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: [],
      selected: {}
    };
  }

  /**
  * Listen for changes in defect lists on database
  */
  listenForDefects(defectsRef: any) {
    defectsRef.on('value', (dataSnapshot) => {
      var defects = [];
      dataSnapshot.forEach((child) => {
        if (child.child('status').val() !== 'unattended')
          defects.push(child.val());
      });
      this.setState({
        data: defects.reverse()
      });
    });
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForDefects(this.defectsRef);
  }

  _toTaskForm(intention: string, defect: Issue | null){
    this.props.navigate('NewTask', {intention: intention, defect: defect});
  }


  deleteRow(secId: number, rowId: number, rowMap: any) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.data];
    newData.splice(rowId, 1);
    this.setState({ data: newData });
  }

  _openModal(data: Issue) {
    this.setState({selected: data})
    this.refs.modal.open()
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
        <Container>
        <Header title="Recent"/>
        <Content>
          {this.renderHeader()}
          <List
          enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.data)}
            renderRow={this.renderRow.bind(this)}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => this._openModal(data)}>
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </Content>

        <Modal
          style={styles.modal}
          ref={"modal"}
          swipeToClose={true}>
            <InfoCard defect={this.state.selected} 
            close={() => this.refs.modal.close()}
            _toTaskForm={this._toTaskForm.bind(this)}/>
        </Modal>

        </Container>
      );
  }

  renderRow = (data: any) => (
    <ListItem button style={styles.listItem} onPress={() => this._openModal(data)}>
      <Left>
        <View style={{...styles.priorityColorIndicator, 
        backgroundColor: data.priority === 3 ? '#b30000' : data.priority === 2 ? '#e68a00' : '#0000e6'}}/>
        <View style={styles.priority}>
          <Button bordered style={styles.priorityIndicator}>
            <Text style={styles.priorityText}>{data.priority}</Text>
          </Button>
          <Text style={styles.underPriorityText}>{data.priority === 3 ? 'High' 
          : data.priority === 2 ? 'Med' : 'Low'}</Text>
        </View>
        <Body style={{marginLeft: 20, marginTop: 15}}>
          <Text style={styles.defectName}>{data.name}</Text>
          <Text style={styles.info}>Creator: {data.creator}</Text>
          <Text note>Status: <Text style={{color: data.status === 'completed' ? 'green' : primary.normal}}>{data.status}</Text></Text>
        </Body>
      </Left>
      {data.image !== '' ?  <Right>
        <Image style={styles.image} source={{uri: data.image}}/>
      </Right> : null}
    </ListItem>
  )

  renderHeader = () => (
    <ListItem itemDivider style={styles.listHeader}>
      <Text style={{marginLeft: 15, fontSize: 20, color: primary.normal}}>Priority</Text>
      <View style={{width: 10}}/>
      <Text style={{fontSize: 20, color: primary.normal}}>Task name</Text>
    </ListItem>
  )
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route: string, params: any) => dispatch(navigate(route, params))
})
export default connect(null, mapDispatchToProps)(History);

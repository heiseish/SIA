//@flow
'use-strict'
import React, { Component } from 'react';
import { Image, View, StatusBar , TextInput, ListView, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Icon, List, ListItem, Text, Left, Button, Body, Right } from 'native-base';
import { alert, Header, Button as Btn, primary} from '../../common'
import firebase from '../../../model/'
import styles from './styles';
var _ = require('lodash/core')

type Issue = {
  name: string,
  priority: number,
  status: string,
  creator: string,
  id: string
};
type Props = {
  navigation: any
};
type State = {
  data: Array<Issue>
};

/**
* Recent View for Planner. Display list of defects that have bene attended to.
*/
export default class History extends Component {
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



  deleteRow(secId: number, rowId: number, rowMap: any) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.data];
    newData.splice(rowId, 1);
    this.setState({ data: newData });
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
              <Button full onPress={() => alert(data)}>
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
        </Container>
      );
  }

  renderRow = (data: any) => (
    <ListItem style={styles.listItem}>
      <Left>
        <Btn style={styles.priorityIndicator} color={data.priority === 3 ? '#b30000' : data.priority === 2 ? '#e68a00' : '#0000e6' } rate={0.5}>
          <Text style={styles.priorityText}>{data.priority}</Text>
        </Btn>
        <Body style={{marginLeft: 50}}>
          <Text style={styles.defectName}>{data.name}</Text>
          <Text style={styles.info}>Supervisor: {data.supervisor}</Text>
          <Text style={styles.info} note>Status: <Text 
          style={{color: data.status === 'Working in Progress' ? primary.normal : 'green'}}>{data.status}</Text>
          </Text>
        </Body>
      </Left>
    </ListItem>
  )

  renderHeader = () => (
    <ListItem style={styles.listHeader}>
      <Text style={{marginLeft: 20, fontSize: 23, color: primary.normal}}>Priority</Text>
      <View style={{width: 30}}/>
      <Text style={{fontSize: 23, color: primary.normal}}>Task name</Text>
    </ListItem>
  )

}


//@flow
'use-strict'
import React, { Component } from 'react';
import { Image, View, StatusBar , TextInput, ListView} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Icon, List, ListItem, Text, Left, Button, Body, Right } from 'native-base';
import { alert, Header, Button as Btn, primary} from '../../common'
import firebase from '../../../model'
import { deleteTask } from '../../../model/query/'
import { navigate } from '../../../actions'
import styles from './styles';
import Modal from 'react-native-modalbox'
import InfoCard from '../infoCard'
var _ = require('lodash/core')

type Issue = {
  name: string,
  priority: number,
  status: string,
  creator: string,
  id: string
};
type Props = {
  navigate: () => void
};
type State = {
  data: Array<Issue>,
  selected: Issue | {}
};

/**
* Home View for Planner. Display list of defects that are currently unattended to.
*/ 
class Home extends Component {
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
        if (child.child('status').val() === 'unattended')
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


  initiateDelete(secId: number, rowId: number, rowMap: any) {
    alert(() => this.deleteRow(secId, rowId, rowMap),
      'Proceeding to delete defect',
      'Are you sure you want to delete the defect?')
  }

  deleteRow(secId: number, rowId: number, rowMap: any) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    // const newData = [...this.state.data];
    // newData.splice(rowId, 1);
    // this.setState({ data: newData });

    deleteTask(this.state.data[rowId].id).then(() => {
      alert(undefined, 'Success!', 'The defect has been successfully deleted!');
    });
  }

  _addDefects(){
    this.props.navigate('NewTask');
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Header 
          title="Home"
          hasRight
          iconNameRight="ios-add"
          handlePressRight={() => this._addDefects()}/>
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
              <Button full danger onPress={_ => this.initiateDelete(secId, rowId, rowMap)}>
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
            <InfoCard defect={this.state.selected}/>
        </Modal>

        </Container>
      );
  }

  renderRow = (data: any) => (
    <ListItem button style={styles.listItem} onPress={() => { 
      this.setState({selected: data})
      this.refs.modal.open()
    }}>
      <Left>
        <Btn style={styles.priorityIndicator} color={data.priority === 3 ? '#b30000' : data.priority === 2 ? '#e68a00' : '#0000e6' } rate={0.5}>
          <Text style={styles.priorityText}>{data.priority}</Text>
        </Btn>
        <Body style={{marginLeft: 50}}>
          <Text style={styles.defectName}>{data.name}</Text>
          <Text style={styles.info}>Creator: {data.creator}</Text>
          <Text style={styles.info} note>Status: <Text style={{color: 'red'}}>{data.status}</Text></Text>
        </Body>
      </Left>
    </ListItem>
  )

  renderHeader = () => (
    <ListItem itemDivider style={styles.listHeader}>
      <Text style={{marginLeft: 20, fontSize: 23, color: primary.normal}}>Priority</Text>
      <View style={{width: 30}}/>
      <Text style={{fontSize: 23, color: primary.normal}}>Task name</Text>
    </ListItem>
  )

}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route: string, params: any) => dispatch(navigate(route, params))
})
export default connect(null, mapDispatchToProps)(Home);


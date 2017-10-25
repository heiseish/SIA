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
import StaffBubble from './StaffBubble'
var _ = require('lodash/core')

type Issue = {
  name: string,
  priority: number,
  status: string,
  creator: string,
  id: string,
  image?: string
};

type Props = {
  navigate: () => void
};

type State = {
  data: Array<Issue>,
  selected: Issue | {}
};

type StaffStatus = 'free' | 'busy';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
/**
* Home View for Planner. Display list of defects that are currently unattended to.
*/
class Home extends Component {
  state: State;
  ds:any;
  props: Props;
  defectsRef: any;
  staffRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      staffData: [],
      selected: {},
      scroll: true,
      pan: new Animated.ValueXY()
    };
    this.defectsRef = firebase.database().ref('defects');
    this.staffRef = firebase.database().ref('staff');
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => this.setState({scroll: false}),
      onPanResponderMove: Animated.event([null, {
        dx : this.state.pan.x,
        dy : this.state.pan.y
      }]),
      onPanResponderRelease: (e, gesture) => {
        this.setState({scroll:true});
      },
    });
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
    this.listenForDefects(this.defectsRef);
    this.listenForStaff(this.staffRef);
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

  _toTaskForm(intention: string, defect: Issue | null){
    this.props.navigate('NewTask', {intention: intention, defect: defect});
  }

  _openModal(data: Issue) {
    this.setState({selected: data})
    this.refs.modal.open()
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <View style={{flex: 1}}>
        <Header
          title="Home"
          hasRight
          iconNameRight="ios-add"
          handlePressRight={() => this._toTaskForm('add',null)}/>
        <Content scrollEnabled={this.state.scroll}>
          {this.renderStaffList()}
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
            <InfoCard defect={this.state.selected}
            close={() => this.refs.modal.close()}
            _toTaskForm={this._toTaskForm.bind(this)}/>
        </Modal>

      </View>
      );
  }

  renderRow = (data: any) => (
    <Animated.View
    {...this.panResponder.panHandlers}
    style={[this.state.pan.getLayout(), {height:100}]}>
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
          <Body style={{marginLeft: 50, marginTop: 15}}>
            <Text style={styles.defectName}>{data.name}</Text>
            <Text style={styles.info}>Creator: {data.creator}</Text>
            <Text note>Status: <Text style={{color: 'red'}}>{data.status}</Text></Text>
          </Body>
        </Left>
        <Right>
          {data.image && <Image style={styles.image} source={{uri: data.image}}/> }
        </Right>
      </ListItem>
    </Animated.View>
  )

  renderHeader = () => (
    <ListItem itemDivider style={styles.listHeader}>
      <Text style={{marginLeft: 20, fontSize: 23, color: primary.normal}}>Priority</Text>
      <View style={{width: 30}}/>
      <Text style={{fontSize: 23, color: primary.normal}}>Task name</Text>
    </ListItem>
  )


  renderStaffList = () => (
    <View style={{height: 100, width: widthScreen - 20, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        horizontal={true}
        data={this.state.staffData}
        keyExtractor={this._staffKeyExtractor}
        renderItem={this._renderStaff}
       />
    </View>
  )

  _staffKeyExtractor = (item, index) => item.id;

  _renderStaff = ({item}) => (
    <StaffBubble name={item.name} status={item.status} />
  );

  renderDraggable = () => {
    return (
      <View style={styles.draggableContainer}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[this.state.pan.getLayout(), styles.circle]}
        >
          <Text style={styles.text}>Drag me!</Text>
        </Animated.View>
      </View>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route: string, params: any) => dispatch(navigate(route, params))
})
export default connect(null, mapDispatchToProps)(Home);

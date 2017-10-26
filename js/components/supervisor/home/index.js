//@flow
'use-strict'
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Container, View, Content, Icon, List, ListItem, Text, Left, Button, Body, Right } from 'native-base';
import { alert, Header, Button as Btn, primary, Image} from '../../common'
import firebase from '../../../model'
import { deleteTask } from '../../../model/query/'
import { navigate, updateTasks } from '../../../actions'
import styles from './styles'
import Modal from 'react-native-modalbox'
import InfoCard from '../infoCard'
import StaffBubble from './StaffBubble'

type Props = {
  navigate: () => void,
  updateTasks: (number) => void
};

type State = {
  defectData: Array<any>,
  staffData: Array<any>,
  selectedDefect: any,
  selectedStaff: any
};

type StaffStatus = 'free' | 'busy';
/**
* Home View for Planner. Display list of defects that are currently unattended to.
*/
class Home extends Component {
  state: State;
  props: Props;
  defectsRef: any;
  staffRef: any;
  panResponder: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      defectData: [],
      staffData: [],
      selectedDefect: {},
      selectedStaff: {}
    };
    this.defectsRef = firebase.database().ref('defects');
    this.staffRef = firebase.database().ref('staff');
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
      this.props.updateTasks(defects.length);
      this.setState({
        defectData: defects.reverse()
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

  _openModal(ref: string, data: any) {
    if (ref === 'modal1') {
      this.setState({selectedDefect: data})
      this.refs.modal1.open()
    } else {
      this.setState({selectedStaff: data})
      this.refs.modal2.open()
    }
    
  }

  render() {
    return (
      <Container>
        <Header title="Home"/>
        <Content>
          {this.renderStaffList()}
          {this.renderHeader()}
          <FlatList
            data={this.state.defectData}
            extraData={this.state}
            keyExtractor={(item, index) => item.id}
            renderItem={this._renderItem}
          />
     
        </Content>

        <Modal
          style={styles.modal}
          ref={"modal1"}
          swipeToClose={true}>
            <InfoCard defect={this.state.selectedDefect}
            handlePress={() => this._assign(this.state.selectedDefect)}
            close={() => this.refs.modal.close()}/>
        </Modal>

      </Container>
      );
  }

  _assign = (defect: any) => {
    this.refs.modal1.close()
    this.props.navigate('Assign', defect)
  }



  _renderItem = ({item}) => (
      <ListItem button style={styles.listItem} onPress={() => this._openModal('modal1', item)}
      >
        <Left>
          <View style={{...styles.priorityColorIndicator,
          backgroundColor: item.priority === 3 ? '#b30000' : item.priority === 2 ? '#e68a00' : '#0000e6'}}/>
          <View style={styles.priority}>
            <Button bordered style={styles.priorityIndicator}>
              <Text style={styles.priorityText}>{item.priority}</Text>
            </Button>
            <Text style={styles.underPriorityText}>{item.priority === 3 ? 'High'
            : item.priority === 2 ? 'Med' : 'Low'}</Text>
          </View>
          <Body style={{marginLeft: 30, marginTop: 15}}>
            <Text style={styles.defectName}>{item.name}</Text>
            <Text style={styles.info}>Creator: {item.creator}</Text>
            <Text note>Status: <Text style={{color: 'red'}}>{item.status}</Text></Text>
          </Body>
        </Left>
        <Right>
          {item.image && <Image style={styles.image} source={{uri: item.image}}/> }
        </Right>
      </ListItem>
  )


  renderHeader = () => (
    <ListItem itemDivider style={styles.listHeader}>
      <Text style={{marginLeft: 10, fontSize: 18, color: primary.normal}}>Priority</Text>
      <View style={{width: 15}}/>
      <Text style={{fontSize: 18, color: primary.normal}}>Task name</Text>
    </ListItem>
  )


  renderStaffList = () => (
    <ListItem style={styles.staffList}>
      <FlatList
        ref={"staffList"}
        scrollEnabled={!this.state.animating}
        horizontal={true}
        data={this.state.staffData}
        keyExtractor={(item, index) => item.id}
        renderItem={this.renderStaff}
       />
    </ListItem>
  )

 
  renderStaff = ({item}) => (
        <View style={{width: 80, height: 80, alignItems: 'center', justifyContent: 'center'}}>
          <Image
          circle
          radius={30}
          source={{uri:'https://s3.amazonaws.com/FringeBucket/default-user.png'}}
          style={{borderWidth:1, borderColor:this.props.status === 'busy' ? 'red' : 'green'}}
           />
          <View style={{height:20, width:80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <View
            style={item.status === 'busy' ? styles.statusCircleBusy : styles.statusCircleFree}
             />
            <Text style={styles.nameLabel}>{item.name.substr(0, item.name.indexOf(' '))}</Text>
          </View>
        </View>
  )

}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route: string, params: any) => dispatch(navigate(route, params)),
  updateTasks: (number: number) => dispatch(updateTasks(number))
})
export default connect(null, mapDispatchToProps)(Home);

//@flow
'use-strict'
import React, { Component } from 'react';
import { FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Container, View, Content, Icon, List, ListItem, Text, Left, Body, Right, Button as Btn} from 'native-base';
import { alert, Header, Button, primary, Image} from '../../common'
import firebase from '../../../model/'
import { getPresentableDateAndTimeFromUnix } from '../../../lib'
import styles from './styles';
import Modal from 'react-native-modalbox'
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
class Done extends Component {
  state: State;
  props: Props;
  defectsRef: any;

  constructor(props: Props) {
    super(props);
    this.defectsRef = firebase.database().ref('defects');    
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
        if (child.child('status').val() === 'unchecked' )
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



  render() {
    return (
        <Content>
          {this.renderHeader()}
          <FlatList
            data={this.state.data}
            extraData={this.state}
            keyExtractor={(item, index) => item.id}
            renderItem={this._renderItem}
          />
        </Content>
      );
  }

  _renderItem = ({item}) => (
    <ListItem button style={styles.listItem}>
        <Left>
          <View style={{...styles.priorityColorIndicator,
          backgroundColor: item.priority === 3 ? '#b30000' : item.priority === 2 ? '#e68a00' : '#0000e6'}}/>
          <View style={styles.priority}>
            <Btn bordered style={styles.priorityIndicator}>
              <Text style={styles.priorityText}>{item.priority}</Text>
            </Btn>
            <Text style={styles.underPriorityText}>{item.priority === 3 ? 'High'
            : item.priority === 2 ? 'Med' : 'Low'}</Text>
          </View>
          <Body style={{marginLeft: 20, marginTop: item.status === 'ongoing' ? 5 : 15}}>
            <Text style={styles.defectName}>{item.name}</Text>
            {item.status === 'ongoing' ? <Text style={styles.info}>Started at: {getPresentableDateAndTimeFromUnix(item.startTime)}</Text> : null}
            <Text note>Status: <Text style={{color: item.status === 'ongoing' ? 'green' : 'red'}}>{item.status}</Text></Text>
          </Body>
        </Left>
        <Right>
          {item.image && <Image style={styles.image} source={{uri: item.image}}/> }
        </Right>
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
export default connect(null, mapDispatchToProps)(Done);

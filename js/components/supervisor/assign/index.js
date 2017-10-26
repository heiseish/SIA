//@flow
'use-strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native'
import { Container,  Form, Item, CheckBox,Input, Left, Body, H3, Button, Text, Content, Icon, Spinner, Right, ListItem  } from 'native-base';
import styles from './styles';
import { Image, alert, Header, secondary} from '../../common/';
import firebase from '../../../model'
import { assign } from '../../../model/query';
import { back } from '../../../actions'

type Props = {
  back: () => void,
  defect?: any,
  navigation: any,
  user: any
};

type State = {
  isLoading: boolean,
  staffData: Array<any>
};

class Assign extends Component {
  props: Props;
  state: State;
  staffRef: any;

  constructor(props: Props){
    super(props)
    this.staffRef = firebase.database().ref('staff');
    this.state = {
      isLoading: false,
      staffData: []
    }
  }

  componentDidMount() {
    this.listenForStaff(this.staffRef);
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


  _pop(){
    this.props.back();
  }

  _initiateTask(staff: any) {
    alert(() => this._assign(staff),
    `Assigning the job to ${staff.name}...`,
    'Press OK to confirm');
  }

  _assign(staff: any) {
    const { state } = this.props.navigation;
    let defect = state.params;
    this.setState({isLoading: true})
    assign(this.props.user.name, staff, defect, () => {
      this.setState({isLoading: false})
      alert(this._pop.bind(this), 'Successful!',
        'The defect has been successfully assigned!',false);
    })
  }

  render() {
    return (
      <Container>
        <Header 
        title='Assign the task'
        hasLeft
        iconNameLeft="arrow-back"
        handlePressLeft={() => this._pop()}/>

        <Content>
          {this.state.isLoading ? <Spinner/> : 
          <FlatList
            data={this.state.staffData}
            extraData={this.state}
            keyExtractor={(item, index) => item.id}
            renderItem={this._renderItem}
          />}
        </Content>
      </Container>
    );
  }

  _renderItem = ({item}) => {
    return (
      <ListItem button style={styles.listItem} onPress={() => this._initiateTask(item)}>
        <Left>
          <Image circle radius={40} source={{uri: 'https://s3.amazonaws.com/FringeBucket/default-user.png'}}
          style={{borderWidth: 1, borderColor: item.status === 'busy' ? 'red' : 'green'}}/>
          <Body>
            <H3>  {item.name}</H3>
            <Text>   Staff</Text>
            <Text note>   Status:  <Text style={{color: item.status === 'free' ? 'green' : 'red'}}>{item.status}</Text></Text>
            {item.current ? <Text note>   Curent task:  <Text style={{color: item.status === 'free' ? 'green' : 'red', alignSelf: 'center'}}>
            {Object.keys(item.current).filter(id => item.current[id].status === 'ongoing')[0] ?
            item.current[Object.keys(item.current).filter(id => item.current[id].status === 'ongoing')[0]].name : ''}</Text></Text> : null}
          </Body>
        </Left>
      </ListItem>
  )
}

}
const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  back: (route: string) => dispatch(back(route))
})

export default connect(mapStateToProps, mapDispatchToProps)(Assign);

//@flow
'use-strict';
import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Container,  Form, Item, Label, CheckBox,Input, Button, Text, Content, Icon } from 'native-base';
import styles from './styles';
import { Image, alert, Header} from '../../common/';
import { createTask } from '../../../model/query';
import { NavigationActions } from 'react-navigation'
let ios = Platform.OS === 'ios'

type Props = {
  navigation: any,
  creator: string
};

type State = {
  name: string,
  priority: '1' | '2' | '3',
  description: string
};

class NewTask extends Component {
  props: Props;
  state: State;

  constructor(props: Props){
    super(props)
    this.state = {
      name: '',
      priority: '1',
      description: ''
    }
  }

  _pop(){
    const backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction);
  }

  _createTask(){
    createTask({
      name: this.state.name,
      priority: parseInt(this.state.priority, 10),
      description: this.state.description
    }, this.props.creator).then((res) => {
      alert(res)
    }).catch(err => {
      alert(err.message)
    })
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header 
        title="Add a defect"
        hasLeft
        iconNameLeft="arrow-back"
        handlePressLeft={() => this._pop()}
        hasRight
        iconNameRight="add"
        handlePressRight={() => this._createTask()}/>

        <Content>
          <Form>
            <Item first stackedLabel>
              <Label>Name</Label>
              <Input 
              onChangeText={name => this.setState({name})}
              value={this.state.name}
              />
              <Icon name="print"/>
            </Item>
            <Item stackedLabel>
              <Label>Priority</Label>
              <Input 
              keyboardType='numeric'
              onChangeText={priority => this.setState({priority})}
              value={this.state.priority}
              />
              <Icon name="warning"/>
            </Item>

            <Item stackedLabel last style={{height: 300}}>
              <Label style={styles.label}>Description</Label>
              <Input 
              ref={c => this._description = c}
              // autoFocus={true}
              //somehow this is not working
              multiline = {true}
              numberOfLines = {10}
              // style={{borderColor: this.props.color,...styles.textInput}}
              onChangeText={(description) => this.setState({description})}
              value={this.state.description}
            />
            </Item>



          </Form>
        </Content>
      </Container>
    );
  }

  done(){
    this.setState({loading: true})
    let user = {
      ...this.props.user,
      name: this.state.name,
      interest: this.state.interest,
      imageURI: this.state.image,
      phone: this.state.contact,
      contactable: this.state.checked
    }
    updateUser(user).then(() => {
        console.log('done')
        this.props.updateUserRedux(user)
        this.setState({loading: false})
        Actions.pop()
      }).catch(err => {
        console.log(err)
        alert(err.message)
        this.setState({loading: false})
      })
  }
}
const mapStateToProps = state => ({
  creator: state.user.name
});


export default connect(mapStateToProps)(NewTask);

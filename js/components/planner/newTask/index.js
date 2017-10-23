//@flow
'use-strict';
import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Container,  Form, Item, Label, CheckBox,Input, Button, Text, Content, Icon, Spinner  } from 'native-base';
import styles from './styles';
import { Image, alert, Header} from '../../common/';
import { createTask } from '../../../model/query';
import { back } from '../../../actions';
let ios = Platform.OS === 'ios'

type Props = {
  back: () => void,
  creator: string
};

type State = {
  name: string,
  priority: '1' | '2' | '3',
  description: string,
  isLoading: boolean
};

class NewTask extends Component {
  props: Props;
  state: State;

  constructor(props: Props){
    super(props)
    this.state = {
      name: '',
      priority: '1',
      description: '',
      isLoading: false
    }
  }

  _pop(){
    this.props.back();
  }

  _createTask(){
    this.setState({isLoading: true})
    createTask({
      name: this.state.name,
      priority: parseInt(this.state.priority, 10),
      description: this.state.description
    }, this.props.creator).then((res) => {
      this.setState({isLoading: false})
      alert(this._pop.bind(this), 'Successful!',
        'The defect has been successfully created!');
    }).catch(err => {
      this.setState({isLoading: false})
      alert(undefined, err.message)
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
          {this.state.isLoading ? <Spinner/> : <Form>
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



          </Form>}
        </Content>
      </Container>
    );
  }

}
const mapStateToProps = (state) => ({
  creator: state.user.name
});

const mapDispatchToProps = (dispatch) => ({
  back: (route: string) => dispatch(back(route))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);

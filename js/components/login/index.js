//@flow
'use-strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container,Content, Item, Text, Input, InputGroup, Icon, Button as Btn } from 'native-base';
import { Animated, View, Platform, Picker} from 'react-native';
import styles from './styles';
const background = require('./cover.jpg')
import { Image,  alert, Button, primary} from '../common';
import Footer from './footer'
var _  = require('lodash/core');

let ios = Platform.OS === 'ios'
type Props = {
  user: ?Object,
  route: ?Object,
  userLogin: () => void,
  pushRoute: () => void,
  navigation: () => void,
  setNutritionList: () => void
};

type State = {
  type: 'planner' | 'supervisor' | 'employee',
  name: string,
  password: string,
  email: string,
  isLoading: boolean,
  loggedIn: boolean,
  emailKeyedIn: boolean,
  passwordKeyedIn: boolean
};

class Login extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    type: 'planner',
  };


  constructor(props: Props) {
    super(props);
    this.state = {
      type: '',
      name: '',
      password: '',
      email: '',
      isLoading: true,
      loggedIn: false,
      emailKeyedIn: false,
      passwordKeyedIn: false
    };
  }

  // componentDidMount () {
  //   getAuthState().then((user) => {
  //     this.setState({isLoading: false})
  //     this.props.userLogin(user);
  //     Actions.home()
  //   }).catch((err) => {
  //     this.setState({isLoading: false})
  //   })
  // }

  
  
  login = (name : string, pw : string) => {

  }

  load = () => {
    this.setState({isLoading: !this.state.isLoading})
  }

  render() {
    return (
      <Container>
        <Content
        style={{backgroundColor: primary.background}}
        scrollEnabled={false}>
        <View style={styles.upper}>
          <Image defaultSource={background} source={background} style={styles.bg}/>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.pickerHolder}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={this.state.type}
              onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
              <Picker.Item label="Planner" value="planner" />
              <Picker.Item label="Supervisor" value="supervisor"/>
              <Picker.Item label="Employee" value="employee"/>
           </Picker>
          </View>

          <View style={{height: 10}}/>

          <Item rounded>
            <Icon active={this.state.emailKeyedIn} name="person" style={styles.icon}/>
            <Input
              placeholder="Email"
              onChangeText={name => this.setState({ name })}
              keyboardType='email-address'
              onEndEditing={(e) =>  this.setState({emailKeyedIn:true})}
            />
          </Item>

          <View style={{height: 10}}/>

          <Item rounded>
            <Icon active={this.state.passwordKeyedIn} name="unlock" style={styles.icon} />
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              onEndEditing={(e) =>  this.setState({passwordKeyedIn:true})}
            />
          </Item>
        </View>

        <View style={styles.bottomHalf}>
          <Button  
            style={styles.loginButton}
            color={primary.normal}
            rate={0.6}
            // onPress={() => this.state.isLoading ? null: this.login(this.state.name,this.state.password)}
            onPress={() => this.state.isLoading ? null: this.login('dtrnggiang@gmail.com','Madara04')}
          >
            <Text style={{color: 'white', backgroundColor: 'transparent'}}>Login</Text>

          </Button>
          <View style={styles.helpArea}>
            <Btn  transparent style={styles.helpText} onPress={() => {}}>
              <Text style={styles.signUpText}>Forgot Password</Text>
            </Btn>
            <View style={{width: 100}}/>
            <Btn  transparent style={styles.helpText} onPress={() => {}}>
              <Text style={styles.signUpText}>Help</Text>
            </Btn>
          </View>
      </View>
    </Content>
    </Container>

    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (user: Object) => dispatch(userLogin(user)),
    // setNutritionList: (list: Array<any>) => dispatch(setNutritionList(list))
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);

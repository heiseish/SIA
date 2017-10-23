//@flow
'use-strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container,Content, Item, Text, Input, InputGroup, Icon, Button as Btn } from 'native-base';
import { Animated, View, Platform, Picker} from 'react-native';
import styles from './styles';
const background = require('./cover.jpg')
import { Image,  alert, Button, primary} from '../common';
import { plannerSignIn } from '../../model/query'
import { userLogin } from '../../actions/';
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
  type: 'planner' | 'supervisor' | 'staff',
  password: string,
  id: string,
  isLoading: boolean,
  loggedIn: boolean,
  IDKeyedIn: boolean,
  passwordKeyedIn: boolean
};

class Login extends Component {
  props: Props;
  state: State;

  static defaultState = {
    type: 'planner',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      type: 'planner', 
      password: '',
      id: '',
      isLoading: true,
      loggedIn: false,
      IDKeyedIn: false,
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
  
  login = () => {
    let id = this.state.id
    let password = this.state.password
    switch (this.state.type) {
      case 'planner':
      plannerSignIn(id, password).then(user => {
        this._navigate('Planner', user)
      })
      break;

      default:


    }
    
  }

  load = () => {
    this.setState({isLoading: !this.state.isLoading})
  }

  _navigate = (route: string, params: any) => {
    this.props.navigation.navigate(route, params)
  }

  render() {
    return (
      <Container>
        <Content
        style={{backgroundColor: primary.background}}
        scrollEnabled={false}>
        <View style={styles.upper}>
          <Image source={background} style={styles.bg}/>
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
                <Picker.Item label="Staff" value="staff"/>
             </Picker>
            </View> 

          <View style={{height: 10}}/>

          <Item rounded>
            <Icon active={this.state.IDKeyedIn} name="person" style={styles.icon}/>
            <Input
              placeholder="Company ID"
              onChangeText={id => this.setState({id})}
              onEndEditing={(e) =>  this.setState({IDKeyedIn: true})}
            />
          </Item>

          <View style={{height: 10}}/>

          { this.state.type === 'staff' ? null : <Item rounded>
            <Icon active={this.state.passwordKeyedIn} name="unlock" style={styles.icon} />
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              onEndEditing={(e) =>  this.setState({passwordKeyedIn:true})}
            />
          </Item>}
        </View>

        <View style={styles.bottomHalf}>
          <Button  
            style={styles.loginButton}
            color={primary.normal}
            rate={0.6}
            // onPress={() => this.state.isLoading ? null: this.login(this.state.name,this.state.password)}
            onPress={() => this.login()}
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

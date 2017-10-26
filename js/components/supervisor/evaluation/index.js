//@flow
'use-strict'
import React, { Component } from 'react';
import { View, TextInput, ListView, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Icon, List, ListItem, Text, Left, Button, Body, Right, Item, Label, Input } from 'native-base';
import StarRating from 'react-native-star-rating';
import { alert, Header, Button as Btn, primary, Image} from '../../common'
import firebase from '../../../model'
import { deleteTask } from '../../../model/query/'
import { navigate, back } from '../../../actions'
import styles from './styles'
import Modal from 'react-native-modalbox'
import StaffCard from './StaffCard'
import DefectSummary from './defectSummary'
var _ = require('lodash/core')

type Props = {
  back: () => void,
  defect: any,
  navigation: any
};

type State = {
  starCount: number,
  staff: any,
  defect: any,
  review: string
}
const deviceWidth = Dimensions.get('window').height;

class EvaluationView extends Component {
  state: State;
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      staff: {},
      defect: {},
      review: ''
    };
  }

  componentDidMount() {
    const { state } = this.props.navigation
    let defect = state.params

    firebase.database().ref(`staff/${defect.staffId}/`).once("value").then((snap) => {
      this.setState({
        staff: snap.val(),
        defect
      })
    })
  }

  onStarRatingPress = (rating: any) => {
    this.setState({
      starCount: rating
    });
  }

  updateRating = (staff: any, defect: any) => {
    //update rating to firebase goes here
  }

  _pop = () => {
    this.props.back()
  }

  render() {
    /*Needs 2 navigation params - staff Title and defectID*/
    const { state } = this.props.navigation
    let defect = state.params
    return (
      <Container>
        <Header
        title={defect.staff}
        hasLeft
        iconNameLeft="arrow-back"
        handlePressLeft={() => this._pop()}
        />
        <Content>
          <DefectSummary defect={defect}/>
          <View style={{height:120, width:null, alignItems: 'center', justifyContent: 'center'}}>
            <StaffCard name={defect.staff} />
          </View>

          <Item stackedLabel style={{height: 300}}>
              <Label style={styles.label}>Review</Label>
              <Input 
              // autoFocus={true}
              //somehow this is not working
              multiline = {true}
              numberOfLines = {10}
              style={{borderColor: primary.normal, borderWidth: 1, width: null}}
              onChangeText={(review) => this.setState({review})}
              value={this.state.review}
            />
          </Item>


          <View style={{height:70,width:null, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontWeight: '400', padding:5,fontSize:30, color: primary.normal}}>Rate {defect.staff} work!</Text>
          </View>
          <StarRating
            starStyle={{color: primary.normal}}
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
           />
           <Btn style={styles.button}
              icon='send' 
              onPress={() => this.updateRating(this.state.staff, this.state.defect)} 
              textStyle={{
                fontSize: 25
              }}
              iconStyle={{
                fontSize: 18
              }}
              color={primary.normal}
              text="Close"/>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route: string, params: any) => dispatch(navigate(route, params)),
  back: (route: string) => dispatch(back(route))
})
export default connect(null, mapDispatchToProps)(EvaluationView);

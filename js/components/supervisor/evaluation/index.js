//@flow
'use-strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Spinner, View, Content, Icon, List, ListItem, Text, Left, Button, Body, Right, Item, Label, Input } from 'native-base';
import StarRating from 'react-native-star-rating';
import { alert, Header, Button as Btn, primary, Image} from '../../common'
import firebase from '../../../model'
import { review } from '../../../model/query/'
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
  review: string,
  isLoading: boolean
};

class EvaluationView extends Component {
  state: State;
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      staff: {},
      defect: {},
      review: '',
      isLoading: true
    };
  }

  componentDidMount() {
    const { state } = this.props.navigation
    let defect = state.params

    firebase.database().ref(`staff/${defect.staffId}/`).once("value").then((snap) => {
      this.setState({
        staff: snap.val(),
        defect,
        isLoading: false
      })
    })
  }

  onStarRatingPress = (rating: any) => {
    this.setState({
      starCount: rating
    });
  }

  updateRating = () => {
    //update rating to firebase goes here
    this.setState({isLoading: true})
    review(this.state.staff, this.state.defect, {
      comment: this.state.review,
      grade: this.state.starCount
    },() => {
      alert(this._pop.bind(this), 'Successful!', 'The defect and staff has successfully been reviewed!', false)
    })
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
        {this.state.isLoading ? <Spinner color={primary.normal}/> : <Content>
          <DefectSummary defect={defect}/>
          <View style={{height:120, width:null, alignItems: 'center', justifyContent: 'center'}}>
            <StaffCard name={defect.staff} />
          </View>

          <Item stackedLabel style={{height: 150}}>
              <Label style={styles.label}>Review</Label>
              <Input 
              // autoFocus={true}
              //somehow this is not working
              multiline = {true}
              numberOfLines = {5}
              style={{borderColor: primary.normal, borderWidth: 1, width: null, borderRadius: 3}}
              onChangeText={(review) => this.setState({review})}
              value={this.state.review}
            />
          </Item>


          <View style={{height:70,width:null, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontWeight: '400', padding:5,fontSize:30, color: primary.normal}}>Rate {defect.staff} work!</Text>
          </View>
          <View style={styles.rating}>
          <StarRating
            starStyle={{color: primary.normal}}
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
           />
           </View>
           <Btn style={styles.button}
              icon='send' 
              onPress={() => this.updateRating()} 
              textStyle={{
                fontSize: 25
              }}
              iconStyle={{
                fontSize: 18
              }}
              color={primary.normal}
              text="Close"/>
        </Content>}
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route: string, params: any) => dispatch(navigate(route, params)),
  back: (route: string) => dispatch(back(route))
})
export default connect(null, mapDispatchToProps)(EvaluationView);

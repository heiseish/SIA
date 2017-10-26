//@flow
'use-strict'
import React, { Component } from 'react';
import { View, TextInput, ListView, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Icon, List, ListItem, Text, Left, Button, Body, Right } from 'native-base';
import StarRating from 'react-native-star-rating';

import { alert, Header, Button as Btn, primary, Image} from '../../common'
import firebase from '../../../model'
import { deleteTask } from '../../../model/query/'
import { navigate } from '../../../actions'
import styles from './styles'
import Modal from 'react-native-modalbox'
import StaffCard from './StaffCard'
var _ = require('lodash/core')

type Props = {
  reset: () => void,
  user: any
};

const deviceWidth = Dimensions.get('window').height;

class EvaluationView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
    };
  }

  onStarRatingPress = (rating) => {
    this.setState({
      starCount: rating
    });
  }

  updateRating = (staffName, defectId) => {
    //update rating to firebase goes here
  }

  render() {
    /*Needs 2 navigation params - staff Title and defectID*/
    const staffTitle = this.props.navigation.params.name;
    const defectID = this.props.navigation.params.defectId;
    return (
      <Container>
        <Header
        title={staffTitle}
        hasLeft
        iconNameLeft="arrow-back"
        handlePressLeft={() => this._pop()}
        />
        <View style={{flex: 1}}>
          <View style={{height:120,width:deviceWidth}}>
            <StaffCard name={staffTitle} />
          </View>
          <View style={{height:70,width:deviceWidth}}>
            <Text style={{padding:5,fontSize:30}}>Rate {staffTitle} work!</Text>
          </View>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
           />
           <Button primary onPress={()=>this.updateRating(staffName, defectId)}><Text>Update Rating</Text></Button>
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route: string, params: any) => dispatch(navigate(route, params))
})
export default connect(null, mapDispatchToProps)(EvaluationView);

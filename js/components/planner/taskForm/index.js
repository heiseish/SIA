//@flow
'use-strict';
import { ImagePicker } from 'expo';
import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Container,  Form, Item, Label, ListItem, CheckBox,Input, Button, Text, Content, Icon, Spinner, ActionSheet  } from 'native-base';
import styles from './styles';
import { Image, alert, Header, secondary, primary} from '../../common/';
import { createTask, editTask, uploadImage } from '../../../model/query';
import { back } from '../../../actions';
import { convertToByteArray, interpretTime, getTimeFromUnix } from '../../../lib';
import Modal from 'react-native-modalbox'
import { Bar } from 'react-native-progress';
import ResourceSelection from './resourceSelection'
import { isValid } from './util'
const _ = require('lodash/core')
let ios = Platform.OS === 'ios'

let ActionSheetConfig = {
  buttons: ios ? [
    'Camera',
    'Photo library',
    'Cancel'
  ] : [
    {text: 'Camera', icon: 'camera-outline', color:'grey'},
    {text: 'Photo library', icon: 'photo-outline', color: 'grey'},
    {text: 'Back', icon: 'trending-down', color: 'grey'}
  ],
  CANCEL_INDEX: 2
}

type Props = {
  intention: 'edit' | 'add',
  back: () => void,
  creator: string,
  defect?: any,
  navigation: any
};

type State = {
  name: string,
  priority: '1' | '2' | '3',
  description: string,
  isLoading: boolean,
  iconName: 'add' | 'checkmark',
  title: "Add a defect" | 'Edit a defect',
  id: number | string,
  isUploading: boolean,
  progress: number,
  image: string,
  flightNoArrival: string,
  flightNoDeparture: string,
  departure: string,
  arrival: string,
  resources: any
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
      isLoading: false,
      iconName: 'add',
      title: "Add a defect",
      id: 0,
      isUploading: false,
      progress: 0,
      image: '',
      flightNoArrival: '',
      flightNoDeparture: '',
      departure: '',
      arrival: '',
      resources: {}
    }
  }

  componentWillMount() {
    const { state } = this.props.navigation;
    let intention = state.params.intention;
    //default case. Do nothing
    if (intention === 'add') {}
    else if (intention === 'edit') {
      let defect = state.params.defect
      this.setState({
        name: defect.name,
        priority: defect.priority.toString(), 
        description: defect.description,
        iconName: 'checkmark',
        title: 'Edit a defect',
        id: defect.id,
        flightNoArrival: defect.flight.arrivalNo,
        flightNoDeparture: defect.flight.departureNo,
        departure: getTimeFromUnix(defect.flight.departure.toString()),
        arrival: getTimeFromUnix(defect.flight.arrival.toString()),
        resources: defect.resources
      })
    }
  }

  _pop(){
    this.props.back();
  }

  _initiateTask() {
    const { state } = this.props.navigation;
    let intention = state.params.intention;


    if (isValid(this.state.departure, this.state.arrival)) {
      switch (intention) {
      case 'add':
      if (!this.state.image)
        alert(() => this._createTask(),
          'Image has not been selected or uploaded completely yet',
          'Are you sure you want to create the defect without an image?');
      else
        this._createTask()
      break;

      case 'edit':
      let defect = state.params.defect
      this._editTask(defect);
      break;

      default:

      }
    }
    
  }

  _createTask() {
    this.setState({isLoading: true})
      createTask({
      name: this.state.name,
      priority: parseInt(this.state.priority, 10),
      description: this.state.description,
      image: this.state.image,
      flight: {
        departureNo: this.state.flightNoDeparture,
        arrivalNo: this.state.flightNoArrival,
        ...interpretTime(this.state.departure, this.state.arrival),
        departureChanged: false,
        arrivalChanged: false,
      },
      resources: this.state.resources
      }, this.props.creator).then((res) => {
        this.setState({isLoading: false})
        alert(this._pop.bind(this), 'Successful!',
          'The defect has been successfully created!',false);
      }).catch(err => {
        this.setState({isLoading: false})
        alert(undefined, err.message)
      })
    
  }

  _editTask(defect: any) {
    this.setState({isLoading: true})
    editTask({
      ...defect,
      name: this.state.name,
      priority: parseInt(this.state.priority, 10),
      description: this.state.description,
      editor: defect.creator === this.props.creator ? null : this.props.creator,
      flight: {
        arrivalNo: this.state.flightNoArrival,
        departureNo: this.state.flightNoDeparture,
        ...interpretTime(this.state.departure, this.state.arrival),
        arrivalChanged: _.isEqual(getTimeFromUnix(defect.flight.arrival),this.state.arrival) ? false : true,
        departureChanged: _.isEqual(getTimeFromUnix(defect.flight.departure),this.state.departure) ? false : true
      },
      resources: this.state.resources
    }).then((res) => {
      this.setState({isLoading: false})
      alert(this._pop.bind(this), 'Successful!',
        'The defect has been successfully edited!',false);
    }).catch(err => {
      this.setState({isLoading: false})
      alert(undefined, err.message)
    })
  }

 



  render() {
    return (
      <Container>
        <Header 
        title={this.state.title}
        hasLeft
        iconNameLeft="arrow-back"
        handlePressLeft={() => this._pop()}
        hasRight
        iconNameRight={this.state.iconName}
        handlePressRight={() => this._initiateTask()}/>

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

            <Item stackedLabel>
              <Label>Flight number (Arrival)</Label>
              <Input 
              onChangeText={flightNoArrival => this.setState({flightNoArrival})}
              value={this.state.flightNoArrival}
              />
              <Icon name="plane"/>
            </Item>


            <Item stackedLabel>
              <Label>Arrival  (form HHMM)</Label>
              <Input
              keyboardType='numeric'
              onChangeText={arrival => this.setState({arrival})}
              value={this.state.arrival}
              />
              <Icon name="clock"/>
            </Item>

            <Item stackedLabel>
              <Label>Flight number (Departure)</Label>
              <Input 
              onChangeText={flightNoDeparture => this.setState({flightNoDeparture})}
              value={this.state.flightNoDeparture}
              />
              <Icon name="plane"/>
            </Item>

            <Item stackedLabel>
              <Label>Next Departure (form HHMM)</Label>
              <Input
              keyboardType='numeric'
              onChangeText={departure => this.setState({departure})}
              value={this.state.departure}
              />
              <Icon name="clock"/>

            </Item>

            <Item stackedLabel last style={{height: 150}}>
              <Label style={styles.label}>Description</Label>
              <Input 
              // autoFocus={true}
              returnKeyType='done'
              //somehow this is not working
              multiline = {true}
              numberOfLines = {5}
              // style={{borderColor: this.props.color,...styles.textInput}}
              onChangeText={(description) => this.setState({description})}
              value={this.state.description}
            />
            </Item>
             {this.renderResources()}
            {this.state.iconName === 'add' ? this.renderUpload() : null}



          </Form>}
        </Content>

        <Modal
              style={styles.modal}
              ref={"modal"}
              swipeToClose={false}>
                <ResourceSelection 
                setResources={(resources) => { 
                  this.refs.modal.close()
                  this.setState({resources})
                }}
                close={() => this.refs.modal.close()}/>
            </Modal>

      </Container>
    );
  }

  renderResources() {
    if (_.isEmpty(this.state.resources)) {
      return (
        <Button bordered rounded iconLeft 
        style={{width: 250, height: 60, alignSelf: 'center', borderColor: secondary.normal, margin: 10}}
        onPress={() => this.refs.modal.open()}>
          <Icon name="archive" style={styles.buttonIcon}/>
          <Text style={{color: secondary.normal}}>Allocate Resources</Text>
        </Button>
      )
    } else {
      return (
          <View style={styles.resources}>
            <Label>Required sources</Label>
            {Object.values(this.state.resources).map((item, index) => (
              <ListItem style={{height: 60, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent'}}>
                <Label>{item.name}</Label>
                <Text>{item.number}</Text>
              </ListItem>

            ))}
            <Button bordered rounded iconLeft 
            style={{width: 250, height: 60, alignSelf: 'center', borderColor: secondary.normal, margin: 10}}
            onPress={() => this.refs.modal.open()}>
              <Icon name="archive" style={styles.buttonIcon}/>
              <Text style={{color: secondary.normal}}>Re-allocate Resources</Text>
            </Button>
          </View>
      )
    }
  }

  renderUpload = () => (
    <View style={styles.upload}>
      {this.state.isUploading ? <Bar
        style={{alignSelf: 'center'}}
        progress={this.state.progress}
        height={15}
        width={300}
        color={!this.state.image ? secondary.normal : 'green'}
        borderWidth={1}
     /> : null}
      <Button bordered style={styles.button} onPress={() => this._selectImage()}>
        <Icon name="cloud-upload" style={styles.buttonIcon}/>
        <Text style={styles.buttonText}>Image</Text>
      </Button>
    </View>
  )

  _selectImage() {
    ActionSheet.show(
    {
      options: ActionSheetConfig.buttons,
      cancelButtonIndex: ActionSheetConfig.CANCEL_INDEX,
      title: 'Please choose a method'
    }, (i) => {
          switch(i) {
            case 0: //camera
            this._openCameraUpload();
            break;

            case 1: //photo library
            this._openLibraryUpload();
            break;

            default:
            //cancel index
          }
        }

    )
  }

  async _openCameraUpload() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      base64:true,
      exif: true
    })

    if (!result.cancelled) {
      this.setState({isUploading: true});
      uploadImage(convertToByteArray(result.base64), (progress) => {
        this.setState({ progress});
      }, (image) => {
        this.setState({image})
      })
    }

  }

  async _openLibraryUpload() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64:true,
      exif: true
    })

    if (!result.cancelled) {
      this.setState({isUploading: true});
      uploadImage(convertToByteArray(result.base64), (progress) => {
        this.setState({ progress});
      }, (image) => {
        this.setState({image})
      })
    }
  }

}
const mapStateToProps = (state) => ({
  creator: state.user.name
});

const mapDispatchToProps = (dispatch) => ({
  back: (route: string) => dispatch(back(route))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);

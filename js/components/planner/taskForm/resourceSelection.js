//@flow
'use-strict';
import React, { Component } from 'react';
import { Dimensions, FlatList} from 'react-native';
import { Image, primary, secondary, Button, alert } from '../../common'
import { Text, View, Icon, ListItem, Item, Input, Spinner} from 'native-base';
import firebase from '../../../model'
import { connect } from 'react-redux';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

type  Props = {
  close: () => void,
  setResources: (any) => void
};

type State = {
  data: Array<any>,
  isLoading: boolean,
  map: Map<>
};

export default class ResourceSelection extends Component {
  state: State;
  props: Props
  constructor(props: Props) {
    super(props)
    this.state = {
      data: [],
      isLoading: true,
      map: new Map()
    }
  }

  componentDidMount() {
    let data = []
    firebase.database().ref('resources').on("value", (snapshot) => {
      snapshot.forEach(child => {
        data.push(child.val())
        if (!this.state.map.has(child.child('name').val()))
          this.state.map.set(child.child('name').val(), 0)
      })
    })
    this.setState({
      data,
      isLoading:false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? <Spinner/> : <FlatList
        data={this.state.data}
        extraData={this.state}
        keyExtractor={(item, index) => item.id}
        renderItem={this.renderItem}
       />}
       {this.renderFooter()}
      </View>
    )
  }

  renderItem = ({item}) => (
    <ListItem style={styles.listItem}>
      <Text>{item.name}</Text>
      <Item rounded style={{width: 80}}>
        <Input 
        returnKeyType='done'
        keyboardType='numeric'
        onChangeText={number =>  
          this.state.map.set(item.name, number)
        }
        value={this.state.map.get(item.name)}
        />
      </Item>
    </ListItem>
  )



  renderFooter = () => (
    <View style={styles.row}>
        <Button style={styles.button}
        icon='brush' 
        onPress={() => this._allocate()} 
        color={secondary.normal}
        textStyle={{
          fontSize: 25
        }}
        iconStyle={{
          fontSize: 25
        }}
        text="Allocate"/>

        <Button style={styles.button}
        icon='close' 
        onPress={() => this.props.close()} 
        textStyle={{
          fontSize: 25
        }}
        iconStyle={{
          fontSize: 25,
        }}
        color={primary.normal}
        text="Close"/>
    </View>
  )

  _allocate() {
    this.setState({isLoading: true})
    let resources = {}
    let violate = false
    for (var key of this.state.map.keys()) {
      resources[key] = {
        name: key,
        number: this.state.map.get(key)
      }
    }
    let data = this.state.data

    for (let object of data) {
      if (parseInt(resources[object.name].number) > parseInt(data.number)) {
        violate = true;
        break;
      }
    }
    if (violate) {
      this.setState({isLoading: false})
      alert(undefined, 'The required resources are greater than what we have!')
    }
    else {
      this.setState({isLoading: false})
      this.props.setResources(resources)
    }
  }


}




const styles = {
  container: {
    height: 500,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5
  },
  row: {
    height: 100,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  button: {
    width: 190,
    height: 50,
    borderRadius: 30
  },
  listItem: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

}


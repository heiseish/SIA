//@flow
'use-strict';
import React, { Component } from 'react';
import { Dimensions, FlatList} from 'react-native';
import { Image, primary, secondary, Button, alert } from '../common'
import { Text, View, Icon, ListItem, Left, Body, H3, Right, Button as Btn } from 'native-base';
import { connect } from 'react-redux';
import { getPresentableDateAndTimeFromUnix } from '../../lib'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

type  Props = {
  defect: {
    name: string,
    priority: number,
    status: string,
    creator: string,
    id: string,
    image?: string
  },
  close: () => void,
  staff: any
};

export default class InfoCard extends Component {
  constructor(props: Props) {
    super(props)
  }

  render() {
    let staff = this.props.staff
    return (
      <View style={styles.container}>
        {this.renderHeader(staff)}
        {staff.current ? this.renderDetails(staff.current) : null}
        {this.renderFooter()}
      </View>
    )
  }

  renderHeader = (item: any) => (
    <ListItem style={styles.listItem}>
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

  renderDetails = (tasks: any) => (
    <View style={styles.body}>
      <FlatList
        data={Object.values(tasks)}
        extraData={this.props}
        keyExtractor={(item, index) => item.id}
        renderItem={this._renderItem}
      />
    </View>

  )

  _renderItem = ({item}) => (
    <ListItem button style={styles.listItemDefect}>
        <Left>
          <View style={{...styles.priorityColorIndicator,
          backgroundColor: item.priority === 3 ? '#b30000' : item.priority === 2 ? '#e68a00' : '#0000e6'}}/>
          <View style={styles.priority}>
            <Btn bordered style={styles.priorityIndicator}>
              <Text style={styles.priorityText}>{item.priority}</Text>
            </Btn>
            <Text style={styles.underPriorityText}>{item.priority === 3 ? 'High'
            : item.priority === 2 ? 'Med' : 'Low'}</Text>
          </View>
          <Body style={{marginLeft: 30, marginTop: item.status === 'ongoing' ? 5 : 15}}>
            <Text style={styles.defectName}>{item.name}</Text>
            {item.status === 'ongoing' ? <Text style={styles.info}>Started at: {getPresentableDateAndTimeFromUnix(item.startTime)}</Text> : null}
            <Text note>Status: <Text style={{color: item.status === 'ongoing' ? 'green' : 'red'}}>{item.status}</Text></Text>
          </Body>
        </Left>
        <Right>
          {item.image && <Image style={styles.image} source={{uri: item.image}}/> }
        </Right>
    </ListItem>
  )
     
  


  renderFooter = () => (
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
  )

}




const styles = {
  container: {
    width: width,
    height: 500
  },

  body: {
    width: width,
    height: 300
  },
  row: {
    width: width,
    height: 100,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: 20
  },
  subTitle: {
    fontWeight: '400', 
    color: primary.normal,
    marginTop: 10,
    marginBottom: 10
  },
  listItem: {
    marginLeft: -1,
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5
  },
  listItemDefect: {
    marginLeft: -1,
    height: 80,
  },

  button: {
    width: 190,
    height: 50,
    borderRadius: 30,
    alignSelf: 'center'
  },
  priorityColorIndicator: {
    height: 80,
    width: 5,
  },
  priorityIndicator: {
    marginTop: 20,
    marginLeft: 20,
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: primary.normal,
    borderWidth: 1
  },
  underPriorityText: {
    color: primary.normal,
    marginLeft: 20
  },
  priorityText: {
    backgroundColor: 'transparent',
    // fontSize: 30,
    alignSelf: 'center',
    color: primary.normal,
  },
  defectName: {
    fontSize:  18,
    fontWeight: '400'
  },

  image: {
    height: 70,
    width: 70,
    borderRadius: 35
  },

  info: {
    fontWeight: '300',
    fontSize: 12
  }

}


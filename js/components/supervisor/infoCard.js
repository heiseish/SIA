//@flow
'use-strict';
import React, { Component } from 'react';
import { Dimensions, Platform} from 'react-native';
import { Image, primary, secondary, Button, alert } from '../common'
import { Text, View, Icon } from 'native-base';
import { getPresentableDateAndTimeFromUnix } from '../../lib'
import { connect } from 'react-redux';
let ios = Platform.OS === 'ios'
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
  handlePress: () => void
};

export default class InfoCard extends Component {
  constructor(props: Props) {
    super(props)
  }

  render() {
    let defect = this.props.defect
    return (
      <View style={styles.container}>
        {this.renderHeader(defect.name)}
        {this.renderDetails(defect)}
        <Text style={styles.subTitle}>     Created by 
        <Text>                   {defect.creator}</Text></Text>
        {defect.supervisor ? <Text style={styles.subTitle}>     Supervised by 
        <Text>                   {defect.supervisor}</Text></Text> : <View style={{height: 30}}/>}
        {this.renderFooter()}
      </View>
    )
  }

  renderHeader = (title: string) => (
    <Button color={secondary.background} style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </Button>
  )

  renderDetails = (defect: any) => (
    <View style={styles.body}>
      <View style={styles.row}>
        {this.renderParticular('Priority',defect.priority)}
        {this.renderParticular('Status', defect.status)}
        <View/>
      </View>

      <View style={styles.row}>
        {this.renderParticular('Arrival Flight Number', defect.flight.arrivalNo)}
        {this.renderParticular('Time', getPresentableDateAndTimeFromUnix(defect.flight.arrival), defect.flight.arrivalChanged)}
        <View/>
      </View>

      <View style={styles.row}>
        {this.renderParticular('Departure Flight Number', defect.flight.arrivalNo)}
        {this.renderParticular('Time', getPresentableDateAndTimeFromUnix(defect.flight.departure), defect.flight.departureChanged)}
        <View/>
      </View>

      <View style={styles.row}>
        <View style={styles.description}>
          <Text style={styles.subTitle}>Description</Text>
          <Text>{defect.description}</Text>
        </View> 
        {defect.image !== '' ? <Image style={styles.image} source={{uri: defect.image}}/> : null}
        <View/>
      </View>

    </View>
  )

  renderParticular = (title: string, value: string | number, changed?: boolean) => (
    <View style={styles.particular}>
      <Text style={styles.subTitle}>{title}</Text>
      <Text style={{color: changed ? 'red' : 'black'}}>{value}</Text>
    </View> 
  )

  renderFooter = () => (
    <View style={styles.row}>
        <Button style={styles.button}
        icon='paper'
        onPress={() => this.props.handlePress()} 
        color='#43893c'
        textStyle={{fontSize: 25 }}
        iconStyle={{ fontSize: 25 }}
        text='Assign'/>

        <Button style={this.props.defect.status === 'ongoing' ? styles.buttonCenter : styles.button}
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

}




const styles = {
  container: {
    height: height,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5
  },
  header: {
    marginTop: 15,
    width: width,
    height: 60,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: secondary.normal
  },
  title: {
    fontSize: 30,
    fontStyle: 'italic',
    color: secondary.normal,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    marginLeft: 30
  },

  body: {
    width: width,
    height: 400,
    flexDirection: 'column',
  },
  row: {
    width: width,
    height: 60,
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
  image: {
    marginTop: 60,
    marginRight: 30,
    width: 130,
    height: 130,
    borderRadius: 10,
    alignSelf: 'center'
  },
  particular: {
    flexDirection: 'column', 
    width: 170, 
    height: 70, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  description: {
    flexDirection: 'column', 
    width: 200, 
    height: 200, 
    alignItems: 'center', 
    justifyContent: 'flex-start'
  },

  button: {
    width: 190,
    height: 50,
    borderRadius: 30
  },

  buttonCenter: {
    width: 190,
    height: 50,
    borderRadius: 30,
    alignSelf: 'center'
  }


}


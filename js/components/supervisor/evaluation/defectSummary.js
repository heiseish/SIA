//@flow
'use-strict';
import React, { Component } from 'react';
import { Dimensions, Platform} from 'react-native';
import { Image, primary, secondary, Button, alert } from '../../common'
import { Text, View, Icon } from 'native-base';
import { getPresentableDateAndTimeFromUnix } from '../../../lib'
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
  }
};

export default class DefectSummary extends Component {
  constructor(props: Props) {
    super(props)
  }

  render() {
    let defect = this.props.defect
    return (
      <View style={styles.container}>
        {this.renderHeader(defect.name)}
        {this.renderDetails(defect)}
        {this.renderHeader('Personels')}
        {defect.supervisor ? <Text style={styles.subTitle}>     Supervised by 
        <Text>                   {defect.supervisor}</Text></Text> : <View style={{height: 30}}/>}
        {defect.staff ? <Text style={styles.subTitle}>     Technician support 
        <Text>           {defect.staff}</Text></Text> : <View style={{height: 30}}/>}
        <Text style={styles.subTitle}>     Started at <Text>     {getPresentableDateAndTimeFromUnix(defect.startTime)}</Text></Text>
        <Text style={styles.subTitle}>     Ended at <Text>       {getPresentableDateAndTimeFromUnix(defect.endTime)}</Text></Text>
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
        {this.renderParticular('Created by', defect.creator)}
      </View>

      <View style={styles.row}>
        <View style={styles.description}>
          <Text style={styles.subTitle}>Description</Text>
          <Text>{defect.description}</Text>
        </View> 
        {defect.image && <Image style={styles.image} source={{uri: defect.image}}/>}
      </View>

    </View>
  )

  renderParticular = (title: string, value: string | number) => (
    <View style={styles.particular}>
      <Text style={styles.subTitle}>{title}</Text>
      <Text>{value}</Text>
    </View> 
  )


}




const styles = {
  container: {
    flexDirection: 'column',
  },
  header: {
    width: width,
    height: 60,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: primary.normal
  },
  title: {
    fontSize: 30,
    fontStyle: 'italic',
    color: primary.normal,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    marginLeft: 30
  },

  body: {
    width: width,
    height: 300,
    flexDirection: 'column',
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center'
  },
  particular: {
    flexDirection: 'column', 
    width: 130, 
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
  },


}


//@flow
'use-strict';
import React, { Component } from 'react';
import {  View,  Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardItem,Text, Container, Button, H3,Header,Left, Body,Title, Right,Content, Icon} from 'native-base';
let ios = Platform.OS === 'ios'
export default ({defect}) =>  (
      <Card>
        <CardItem header>
          <H3>Defect: {defect.name}</H3>
        </CardItem>

        <CardItem>
          <Text>{defect.priority}</Text>
          <Text note>{defect.status}</Text>
        </CardItem>

        <CardItem>
          <Body>
            <Text>{defect.description}</Text>
          </Body>
        </CardItem>

        <CardItem footer>
          {defect.supervisor && <Text>Supervised by {defect.supervisor}</Text>}
          <Text note>Created by {defect.creator}</Text>
        </CardItem>
      </Card>
);

const styles = {

}


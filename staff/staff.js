import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { SERVER } from '../constants.js';

export default class Staff extends Component {
    render() {
        const { params } = this.props.navigation.state;
        //params should contains user_name, user_id
        //fetch data from database to see the list of tasks one has to do
        
    }
}

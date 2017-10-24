//@flow
'use-strict';
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import styles from './styles'

type Props = {
    card_text: string,
    _collapse: () => void,
    card_id: number
};

type State = {
    complete: boolean,
    timeoutID: any
};
/*
Represents a TaskCard to be displayed on UI for staff.
*/
export default class TaskCard extends Component {
    state: State;
    props: Props;

    constructor(props: Props) {
        super(props);
        this.state = {
            complete: false,
            timeoutID: undefined
        };
    }

    componentDidMount = () => {
        this.setState({
            complete: false,
            timeoutID: undefined
        });
    }

    _onWaitTest = (isComplete) => { this.props._collapse(); }

    _onWait = (isComplete) => {
        if (isComplete) {
            const id = setTimeout(this._closeRow, 3000);
            this.setState((prevState, props)=>{
                return {
                    complete: prevState.complete,
                    timeoutID: id
                };
            });
        } else {
            clearTimeout(this.state.timeoutID);
        }
    }

    _closeRow = () => {
        this.setState({complete: !this.state.complete},
            () => this.props._collapse())
    }

    _onPressCard = () => {
        this.setState((prevState, props)=>{
            return {complete: !prevState.complete,
                timeoutID: prevState.timeoutID};
        }, () => this._onWait(this.state.complete));
    }

    render() {
        if (!this.state.complete) {
            return (
                <TouchableOpacity onPress={this._onPressCard} style={{padding: 4}}>
                    <View style={styles.incompleteCard}>
                        <Text style={styles.incompleteCardText}>
                            {this.props.card_id}. {this.props.card_text}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={this._onPressCard} style={{padding: 4}}>
                    <View style={styles.completeCard}>
                        <Text style={styles.completeCardText}>
                            {this.props.card_id}. {this.props.card_text}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

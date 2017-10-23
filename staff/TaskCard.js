import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

/*
Represents a TaskCard to be displayed on UI for staff.
*/
export default class TaskCard extends Component {
    constructor(props) {
        super(props);
        this.state = {complete: false, timeoutID: undefined};
    }

    function _onWait(isComplete) {
        if (isComplete) {
            const id = this.setTimeout(this.props._collapse, 5000);
            this.setState((prevState, props)=>{
                return {
                    complete: prevState.complete,
                    timeoutID: id
                };
            });
        } else {
            this.clearTimeout(this.state.timeoutID);
        }
    }

    function _onPressCard() {
        this.setState((prevState, props)=>{
            return {complete: !prevState.complete,
                timeoutID: prevState.timeoutID};
        }, () => this._onWait(this.state.complete));
    }

    render() {
        if (!this.state.complete) {
            return (
                <TouchableOpacity onPress={this._onPressCard}>
                    <View style={styles.incompleteCard}>
                        <Text style={styles.incompleteCardText}>
                            {this.props.card_text}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={this._onPressCard}>
                    <View style={styles.completeCard}>
                        <Text style={styles.completeCardText}>
                            {this.props.card_text}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    incompleteCard: {
        height: 125,
        backgroundColor: 'lightpink',
        borderColor: 'crimson',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    completeCard: {
        height: 125,
        backgroundColor: 'lightgreen',
        borderColor: 'forestgreen',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    incompleteCardText: {
        fontFamily: 'sans-serif',
        fontSize: 40,
        fontWeight: 'bold',
        color: 'darkred'
    },
    completeCardText: {
        fontFamily: 'sans-serif',
        fontSize: 40,
        fontWeight: 'bold',
        color: 'darkgreen'
    }
});

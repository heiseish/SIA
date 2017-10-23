import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

/*
Represents a TaskCard to be displayed on UI for staff.
*/
export default class TaskCard extends Component {
    constructor(props) {
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
            const id = setTimeout(this.props._collapse, 3000);
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

const styles = StyleSheet.create({
    incompleteCard: {
        height: 125,
        width: screen_width - 30,
        borderRadius: 20,
        backgroundColor: 'lightpink',
        borderWidth: 1,
        borderColor: 'crimson',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    completeCard: {
        height: 125,
        width: screen_width - 30,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: 'lightgreen',
        borderColor: 'forestgreen',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    incompleteCardText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'darkred'
    },
    completeCardText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'darkgreen'
    }
});

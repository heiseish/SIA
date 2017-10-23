import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';

/*
Represents a TaskCard to be displayed on UI for staff.
*/
export default class TaskCard extends Component {
    constructor(props) {
        super(props);
        this.state = {complete: false};
    }

    render() {
        if (!this.state.complete) {
            return (
                <View style={styles.incompleteCard}>
                    <Text style={styles.incompleteCardText}>
                        {this.props.card_text}
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={styles.completeCard}>
                    <Text style={styles.completeCardText}>
                        {this.props.card_text}
                    </Text>
                </View>
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

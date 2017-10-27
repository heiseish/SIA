//@flow
'use-strict';
import React, { Component } from 'react';
import { View, Text, ListItem, Left, Body, Right, Button } from 'native-base'
import { primary, Image } from '../../common';
import styles from './styles'

type Props = {
    card: any,
    handlePress: () => void
};

/*
Represents a TaskCard to be displayed on UI for staff.
*/
export default class TaskCard extends Component {
    props: Props;

    constructor(props: Props) {
        super(props);
    }

    render() {
        let card = this.props.card
        return (
            <ListItem button style={styles.listItem} onPress={() => this.props.handlePress()}>
              <Left>
                <View 
                style={{...styles.priorityColorIndicator,
                        backgroundColor: card.priority === 3 ? '#b30000' : card.priority === 2 ? '#e68a00' : '#0000e6'}}/>
                <View style={styles.priority}>
                  <Button bordered style={styles.priorityIndicator}>
                    <Text style={styles.priorityText}>{card.priority}</Text>
                  </Button>
                  <Text style={styles.underPriorityText}>{card.priority === 3 ? 'High' 
                  : card.priority === 2 ? 'Med' : 'Low'}</Text>
                </View>
                <Body style={{marginLeft: 30, marginTop: 15}}>
                  <Text style={styles.defectName}>{card.name}</Text>
                  <Text note>Status: <Text style={{color: card.status === 'assigned' ? 'red' : 'green'}}>{card.status === 'assigned' ? 'Not started' : card.status}</Text></Text>
                </Body>
              </Left>

              {card.image !== '' ? <Right>
                <Image style={styles.image} source={{uri: card.image}}/> 
              </Right> : null}
            </ListItem>
        );
    }
}

import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { Constants } from 'expo';
import * as Progress from 'react-native-progress';

import { SERVER } from '../constants.js';
import { TaskCard } from 'TaskCard.js';

export default class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task_number: 0,
        };
    }

    function _removeTask(idRemove) {
        var newData = [];
        var i;
        for (i = 0; i < test_data.length; i++) {
            if (test_data[i].id < idRemove) {
                newData.push(test_data[i]);
            }
            if (test_data[i].id > idRemove) {
                newData.push({
                    task: test_data[i].task,
                    id: test_data[i].id - 1
                });
            }
        }
        test_data = newData;
        this.setState((prevState, props)=>{
            return {task_number: prevState.task_number + 1};
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        //params should contains user_name, user_id
        //fetch data from database to see the list of tasks one has to do
        <View style={{padding: 30}}>
            <Progress.Bar
                progress={this.state.task_number/4}
                width={null}
                color='green'
             />
        </View>
        <Content style={{height: 400}}>
            <FlatList
                data={test_data}
                renderItem={
                    ({item}) => <TaskCard
                        card_text={item.task}
                        _collapse={()=>this._removeTask(item.id)}
                        card_id={item.id}
                         />
                }
            />
        </Content>
        <Footer>
            <FooterTab>
                <Button vertical>
                  <Icon name="paper" />
                  <Text>Tasks</Text>
                </Button>
                <Button vertical>
                  <Icon name="person" />
                  <Text>Log Out</Text>
                </Button>
            </FooterTab>
        </Footer>
    }
}

var test_data = [
    {task: 'Clean toilet', id: 1},
    {task: 'Replace mattress', id: 2},
    {task: 'Clear trash in cabin', id: 3},
    {task: 'Get rid of yourself', id: 4}
];

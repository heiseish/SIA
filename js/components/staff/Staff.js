//@flow
'use-strict';
import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import * as Progress from 'react-native-progress';

import TaskCard from './TaskCard';
type Props = {
    navigate: () => void
};

type State = {
    task_number: number,
    tasks: Array<{task: string, id: number}>
};

export default class Staff extends Component {
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            task_number: 0,
            tasks: [
                {task: 'Clean toilet', id: 1},
                {task: 'Replace mattress', id: 2},
                {task: 'Clear trash in cabin', id: 3},
                {task: 'Get rid of yourself', id: 4}
            ]
        };
    }

    _removeTask = (idRemove) => {
        var newData = [];
        var i;
        const test_data = this.state.tasks;
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
        this.setState({tasks: newData});
    }

    render() {
        //params should contains user_name, user_id
        //fetch data from database to see the list of tasks one has to do
        return (
            <Container style={{backgroundColor: '#3A3A3A'}}>
                <View style={{paddingTop: 40, paddingBottom: 10}}>
                    <Progress.Bar
                        progress={this.state.task_number/4}
                        width={null}
                        color='lightgreen'
                        borderWidth={2}
                     />
                </View>
                <Content style={{height: 300}}>
                    <FlatList
                        data={this.state.tasks}
                        keyExtractor={(item, index) => item.id}
                        extraData={this.state}
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
                          <Icon active name="paper" />
                          <Text>Tasks</Text>
                        </Button>
                        <Button vertical>
                          <Icon name="person" />
                          <Text>Log Out</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

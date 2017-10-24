//@flow
'use-strict';
import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import * as Progress from 'react-native-progress';

import TaskCard from './TaskCard';
import { Header } from '../common';
import styles from './styles';

const widthScreen = Dimensions.get('window').width;

type Props = {
    navigate: () => void
};

type State = {
    taskNumber: number,
    tasks: Array<{task: string, id: number}>
};

export default class Staff extends Component {
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            taskNumber: 0,
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
        const testData = this.state.tasks;
        for (i = 0; i < testData.length; i++) {
            if (testData[i].id < idRemove) {
                newData.push(testData[i]);
            }
            if (testData[i].id > idRemove) {
                newData.push({
                    task: testData[i].task,
                    id: testData[i].id - 1
                });
            }
        }
        this.setState((prevState) => {
            return {
                taskNumber: prevState.taskNumber + 1,
                tasks: newData
            }
        });
    }

    render() {
        //params should contains user_name, user_id
        //fetch data from database to see the list of tasks one has to do
        return (
            <Container style={{backgroundColor: '#3A3A3A'}}>
                <Header title="Staff"/>
                <View style={{paddingTop: 40, paddingBottom: 10, flexDirection: 'row'}}>
                    <Text style={styles.progressBarLabel}>
                        {this.state.taskNumber}/{4}
                    </Text>
                    <View style={{width:250,flexDirection:'row',alignItems:'center'}}>
                        <Progress.Bar
                            progress={this.state.taskNumber/4}
                            width={230}
                            color='lightgreen'
                            borderWidth={2}
                         />
                    </View>
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

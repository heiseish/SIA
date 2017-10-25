//@flow
'use-strict';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, View } from 'native-base';
import { Bar } from 'react-native-progress';
import TaskCard from './TaskCard';
import { connect } from 'react-redux';
import firebase from '../../../model'
import { Header, secondary } from '../../common';
import Modal from 'react-native-modalbox'
import InfoCard from '../infoCard'
import styles from './styles';

type Props = {
    navigate: () => void
};

type State = {
    taskNumber: number,
    tasks: Array<{task: string, id: number}>,
    selected: any
};

class Tasks extends Component {
    state: State;
    defectsRef: any;

    constructor(props: Props) {
        super(props);
        this.defectsRef = firebase.database().ref('defects');
        this.state = {
            taskNumber: 0,
            tasks: [],
            selected: {}
        };
    }

    /**
      * Listen for changes in defect lists on database
      */
      listenForDefects(defectsRef: any) {
        defectsRef.on('value', (dataSnapshot) => {
          var defects = [];
          dataSnapshot.forEach((child) => {
            //push when the status is ongoing and the staff working on the task is the same as user name
            if (child.child('status').val() === 'Work in Progress' && child.child('staff').val() === this.props.name)
              defects.push(child.val());
          });
          this.setState({
            tasks: defects.reverse()
          });
      });
    }

    componentDidMount() {
        // start listening for firebase updates
        this.listenForDefects(this.defectsRef);
    }

    render() {
        //params should contains user_name, user_id
        //fetch data from database to see the list of tasks one has to do
        return (
            <Container>
                <Header title="Tasks"/>
                <Content>

                    <View style={styles.header}>
                        <Text style={styles.progressBarLabel}>
                            {this.state.taskNumber}/4
                        </Text>
                        <Bar
                            height={20}
                            progress={this.state.taskNumber/4}
                            width={250}
                            color={secondary.normal}
                            borderWidth={1}
                            borderRadius={20}
                         />
    
                    </View>

                    <FlatList
                        data={this.state.tasks}
                        keyExtractor={(item, index) => item.id}
                        extraData={this.state}
                        renderItem={
                            ({item}) => <TaskCard key={item.id}
                                card={item} handlePress={() => this._openModal(item)}/>
                            
                        }
                    />
                </Content>

                <Modal
                  style={styles.modal}
                  ref={"modal"}
                  swipeToClose={true}>
                    <InfoCard defect={this.state.selected} 
                    close={() => this.refs.modal.close()}
                    completeTask={this._completeTask.bind(this)}/>
                </Modal>
            </Container>
        );
    }

    _openModal(item: any) {
        this.setState({selected: item})
        this.refs.modal.open()
    }

    _completeTask() {

    }
}

const mapStateToProps = (state) => ({
    name: state.user.name
})
export default connect(mapStateToProps)(Tasks)

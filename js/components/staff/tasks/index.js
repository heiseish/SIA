//@flow
'use-strict';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Container, Content, Button, Icon, Text, View, List, ListItem } from 'native-base';
import { Bar } from 'react-native-progress';
import { updateTasks } from '../../../actions'
import TaskCard from './TaskCard';
import { connect } from 'react-redux';
import firebase from '../../../model'
import {type Defect} from '../../../model/defect'
import { startTask, stopTask } from '../../../model/query'
import { Header, secondary, primary, alert } from '../../common';
import Modal from 'react-native-modalbox'
import InfoCard from '../infoCard'
import styles from './styles';

type Props = {
    navigate: () => void,
    tasksCompleted: number,
    status: 'free' | 'busy',
    user: any,
    updateTasks : (number) => void
};

type State = {
    taskNumber: number,
    tasks: Array<Defect>,
    selected: {} | Defect
};

class Tasks extends Component {
    state: State;
    defectsRef: any;
    ds: any;

    constructor(props: Props) {
        super(props);
        this.defectsRef = firebase.database().ref('defects');
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
            if ((child.child('status').val() === 'assigned' 
                || child.child('status').val() === 'ongoing') 
                && child.child('staff').val() === this.props.name)
              defects.push(child.val());
          });
          this.props.updateTasks(defects.length);
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
                            {this.props.tasksCompleted}/10
                        </Text>
                        <Bar
                            height={40}
                            progress={this.props.tasksCompleted/10}
                            width={250}
                            color={primary.normal}
                            borderWidth={1}
                            borderRadius={20}
                         />
    
                    </View>

                    {this.renderHeader()}
                      <List
                        enableEmptySections
                        dataSource={this.ds.cloneWithRows(this.state.tasks)}
                        renderRow={(data) => <TaskCard key={data.id}
                                card={data} handlePress={() => this._openModal(data)}/>}
                        renderLeftHiddenRow={data =>
                          <Button full onPress={() => this._openModal(data)}>
                            <Icon active name="information-circle" />
                          </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                          <Button full success={data.status === 'assigned'} danger={data.status === 'ongoing'} 
                          onPress={_ => this._initiateStartOrStop(data, secId, rowId, rowMap)}>
                            <Icon active name={data.status === 'assigned' ? 'paper' : 'close'} />
                          </Button>}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                      />

                </Content>

                <Modal
                  style={styles.modal}
                  ref={"modal"}
                  swipeToClose={true}>
                    <InfoCard defect={this.state.selected} 
                    close={() => this.refs.modal.close()}
                    initiateStartOrStop={this._initiateStartOrStop.bind(this)}/>
                </Modal>
            </Container>
        );
    }

    _initiateStartOrStop(defect: Defect, secId?: string, rowId?: string, rowMap?: any) {
        this.refs.modal.close()
        if (defect.status === 'assigned') {
            if (secId && rowId && rowMap) {
                rowMap[`${secId}${rowId}`].props.closeRow();
            }
            this._startTask(defect)
        }
        else if (defect.status === 'ongoing') {
            if (secId && rowId && rowMap) {
                rowMap[`${secId}${rowId}`].props.closeRow();
            }
            this._stopTask(defect)
        }
    }

    renderHeader = () => (
        <ListItem itemDivider style={styles.listHeader}>
            <Text style={{marginLeft: 15, fontSize: 20, color: primary.normal}}>Priority</Text>
            <View style={{width: 10}}/>
            <Text style={{fontSize: 20, color: primary.normal}}>Task name</Text>
        </ListItem>
    )

    _openModal(item: any) {
        this.setState({selected: item})
        this.refs.modal.open()
    }

    _startTask(defect: Defect) {
        if (this.props.status === 'busy')
            alert(undefined,"You're currently working on another task! Please click finish that task before starting a new one.")
        else {
            startTask(this.props.user, defect)
            alert(undefined, 'Sucess!', 'Good luck on the task!')
        }
    }

    _stopTask(defect: Defect) {
        stopTask(this.props.user, defect)
        alert(undefined, 'Success!', 'Your task has successfully been registered as complete!')
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    name: state.user.name,
    status: state.user.status,
    tasksCompleted: state.user.defectClearedToday
})

const mapDispatchToProps = (dispatch) => ({
    updateTasks: (number: number) => dispatch(updateTasks(number))
})
export default connect(mapStateToProps, mapDispatchToProps)(Tasks)

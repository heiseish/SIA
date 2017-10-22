//@flow
'use-strict';

import {NetInfo} from 'react-native';
import {err} from '../connection'
import moment from 'moment';
let today = moment().format("DD MMMM YYYY")
//somehow the promise always response. the workaround is to check connectivity when the button is pressed
import type State from '../../reducers/attendance'
import firebase from '../';
export default  (id: string, clientIDs: any) => {
	return new Promise((response, reject) => {
		NetInfo.isConnected.fetch().then(isConnected => { 
			if (!isConnected) 
				reject(err)
			else {
				firebase.database().ref(`/users/${id}/sessions/${today}`).once("value").then((snap) => {
					let attendance = snap.val()
					if (attendance.hasOwnProperty('attendance')) {//verified by user
						attendance.attendance = 'completed'
						delete attendance.confirmedParty
					} else {
						attendance.attendance = 'need_verification'
						attendance.confirmedParty = 'trainer'
					}
					firebase.database().ref(`/users/${id}/sessions/${today}`).set(attendance).then((error)=> {
						if (error)
							reject(error)
						else
							response(attendance)

					})


				})
			

			}
		})
	})

}

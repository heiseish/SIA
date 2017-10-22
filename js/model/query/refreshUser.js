//@flow
'use-strict';
import firebase from '../';
import {NetInfo} from 'react-native';
import {err} from '../connection'
export default  (id: string) => {
	return new Promise((response, reject) => {
		NetInfo.isConnected.fetch().then(isConnected => { 
			if (!isConnected) 
				reject(err)
			else {
				firebase.database().ref(`/trainers/${id}`).once("value").then((snap) => {
					response(snap.val())
				}).catch(err =>  reject(err))
			

			}
		})
	})
}

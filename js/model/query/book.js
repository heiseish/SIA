//@flow
'use-strict';
import firebase from '../';
import {NetInfo} from 'react-native';
import {err} from '../connection'

export default  (id: number,uid: string, date: string, detail: Object) => {
	return new Promise((response, reject) => {
		NetInfo.isConnected.fetch().then(isConnected => { if (!isConnected) reject(err)})
		
		firebase.database().ref('/users/' + `${uid}` + '/sessions/' + `${date}` + '/').set(detail).then(() => {
			firebase.database().ref('/users/' + `${uid}`).once("value").then(snap => response({
				...snap.val(),
				id: id
			}))
		})
		
		
		

	})



}

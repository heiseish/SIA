//@flow
'use-strict';
import firebase from '../';
import grabUser from './grabUser'
import {NetInfo} from 'react-native'
export default () => {
	return new Promise((response,reject) => {
		NetInfo.isConnected.fetch().then(isConnected => {
			if (!isConnected)
				reject()
			firebase.auth().onAuthStateChanged((user,error) => {
				if (user) {
					grabUser(user.uid, user.email).then(res => {
						response(res)
					})
				} else 
				reject()
			});
		})
		
	})
}

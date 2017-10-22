//@flow
'use-strict';

import {NetInfo} from 'react-native';
import {err} from '../connection'
import firebase from '../';
export default  (user: any) => {
	return new Promise((response, reject) => {
		NetInfo.isConnected.fetch().then(isConnected => { 
			if (!isConnected) 
				reject(err)
			else {
				firebase.database().ref('/trainers/' + `${user.uid}`).set(user).then(()=> {
					response()
				})
			

			}
		})
	})

}

//@flow
'use-strict';

import {NetInfo} from 'react-native';
import {err} from '../connection'
import firebase from '../';
export default  (subject: string, text: string) => {
	return new Promise((response, reject) => {
		NetInfo.isConnected.fetch().then(isConnected => { 
			if (!isConnected) 
				reject(err)
			else {
				firebase.database().ref('feedback').push({
					subject: subject,
					text: text
				}).then(() => {
					response()
				}).catch(err => reject(err))

			}
		})


	})
}

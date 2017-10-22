//@flow
'use-strict';
import firebase from '../';
import {NetInfo} from 'react-native';
import {err} from '../connection'

export default  (trainer: string, trainerName: string,image: string, trainee: string) => {
	return new Promise((response, reject) => {
		NetInfo.isConnected.fetch().then(isConnected => { if (!isConnected) reject(err)})
		
		firebase.database().ref(`/requests/${trainer}-${trainee}`).set({
			trainer: trainer, 
			trainerName: trainerName,
			image: image,
			trainee: trainee
		}).then(() => response())
		
		
		

	})



}

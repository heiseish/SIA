//@flow
'use-strict';
import firebase from '../';
import { getTimeUnix } from '../../lib/timeUtil'
import { getLastId } from './getLastId';
const defectRef = firebase.database().ref('defects/');
const time = getTimeUnix();
export const createTask  = (defect: any, creator: string) => {
	return new Promise((response,reject) => {
		if (!defect.name || defect.priority === NaN || !defect.description)
			reject({message: 'Please fill in all the blanks!'})
		else if (isNaN(defect.priority) || defect.priority < 1 || defect.priority > 3)
			reject({message: 'Priority should be 1-3 inclusively only!'})
		else {
			getLastId().then(id => {
				firebase.database().ref(`defects/${id}/`).set({
					...defect,
					creator,
					id,
					status: 'unattended',
					createdDate: time
				}).then(() => {
					response()
				})
			})
			
		}
		
	})
}

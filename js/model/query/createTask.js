//@flow
'use-strict';
import firebase from '../';
const defectRef = firebase.database().ref('defects/');
export const createTask  = (defect: any, creator: string) => {
	return new Promise((response,reject) => {
		if (!defect.name || defect.priority === NaN || !defect.description)
			reject({message: 'Please fill in all the blanks!'})
		else if (isNaN(defect.priority) || defect.priority < 1 || defect.priority > 3)
			reject({message: 'Priority should be 1-3 inclusively only!'})
		else 
			defectRef.orderByChild('id').limitToLast(1).once("value").then((snap) => {
				let id = 0
				snap.forEach(snapshot => {
					id = parseInt(snapshot.key) + 1
				})
				firebase.database().ref(`defects/${id}/`).set({
					...defect,
					creator,
					id,
					status: 'unattended'
				}).then(() => {
					response()
				})
			})
	})
}

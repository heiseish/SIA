//@flow
'use-strict';
import firebase from '../';
const defectRef = firebase.database().ref('defects/');
export const editTask  = (defect: any) => {
	return new Promise((response,reject) => {
		if (!defect.name || defect.priority === NaN || !defect.description)
			reject({message: 'Please fill in all the blanks!'})
		else if (isNaN(defect.priority) || defect.priority < 1 || defect.priority > 3)
			reject({message: 'Priority should be 1-3 inclusively only!'})
		else 
			firebase.database().ref(`defects/${defect.id}/`).set(defect).then(() => {
				response()
			})
	})
}

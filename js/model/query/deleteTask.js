//@flow
'use-strict';
import firebase from '../';
const defectRef = firebase.database().ref('defects/');
export const deleteTask  = (id: string) => {
	return new Promise((response,reject) => {
		if (id === undefined || id === null)
			reject({message: 'Error deleting defects!'})
		else 
			defectRef.child(id).remove().then(() => response())
	})
}

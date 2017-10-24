//@flow
'use-strict';
import firebase from '../';
const defectRef = firebase.database().ref('defects/');
export const getLastId  = () => {
	return new Promise((response) => {
		defectRef.orderByChild('id').limitToLast(1).once("value").then((snap) => {
			let id = 0
			snap.forEach(snapshot => {
				id = parseInt(snapshot.key) + 1
			})
			response(id)
		})
	})
}
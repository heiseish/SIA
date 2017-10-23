//@flow
'use-strict';
import firebase from '../';
const plannerRef = firebase.database().ref('planner');
export const plannerSignIn  = (id: string, password: string) => {
	return new Promise((response,reject) => {
		if (!id || !password)
				reject({message: 'Please fill in all the fields before submitting!'})
		else {
			plannerRef.once('value').then((snap) =>{
			if (snap.hasChild(id)) {
				if (snap.child(id).child(password).val() === password)
					//if found just return the object
					response(snap.child(id).val())
				else 
					reject({message: 'The password is incorrect'})
			} else
				reject({message: 'No such user in our database'})

		})
		}
	});
}

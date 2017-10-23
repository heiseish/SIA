//@flow
'use-strict';
import firebase from '../';

export const signIn  = (type: 'planner' | 'supervisor' | 'staff', id: string, password: string) => {
	return new Promise((response,reject) => {
		if ((type === 'planner' || type === 'supervisor') && (!id || !password ))
				reject({message: 'Please fill in all the fields before submitting!'})
		else {
			firebase.database().ref(type).once('value').then((snap) =>{
				if (snap.hasChild(id)) {
					if (snap.child(id).child('password').val() === (password))
						//if found just return the object
						response(snap.child(id).val())
					else if (type === 'staff')
						response(snap.child(id).val())
					else
						reject({message: 'The password is incorrect'})
				} else
					reject({message: 'No such user in our database'})

			})
		}
	});
}

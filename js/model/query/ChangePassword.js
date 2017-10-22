//@flow
'use-strict';
import firebase from '../'
export default (email: string) =>  {
	return new Promise((response,reject) => {
		if (!email)
				reject({message: 'Please fill in all the fields before submitting!'})
		else 
			firebase.auth().sendPasswordResetEmail(email).then(() => {
				response()
			}).catch(err => reject(err))
				



	})
}

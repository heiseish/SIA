//@flow
'use-strict';
import firebase from '../';
import grabUser from './grabUser'
export default (email: string,password: string) => {
	return new Promise((response,reject) => {
		if (!email || !password)
				reject({message: 'Please fill in all the fields before submitting!'})
		else 
			firebase.auth().signInWithEmailAndPassword(email,password).then((user) => {
				if (!user.emailVerified)
					reject({message:'A link has been sent to your email. Please verify your email first'});
				else
					grabUser(user.uid, user.email).then(res => {
						response(res)
					})
			}).catch(function(error) {
				reject(error);
			});
	});
}

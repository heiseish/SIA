//@flow
'use-strict';
import firebase from '../';
import grabUser from './grabUser'
export default (name: string,email: string,password: string) => {
	return new Promise( function(response,reject){
		if (!email || !name || !password)
				reject({message: 'Please fill in all the fields before submitting!'})
		else 
			firebase.auth().createUserWithEmailAndPassword(email,password).then(function(user){
				user.sendEmailVerification()
				// reject({message:'A link has been sent to your email. Please verify your email first'});
				grabUser(user.uid, user.email, name).then(res => {
					response()
				})
				response(user)
			}).catch(function(error) {
				reject(error);
			});
	});

}

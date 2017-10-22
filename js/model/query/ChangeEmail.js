//@flow
'use-strict';
import firebase from '../'
export default ChangeEmail = (email: string,oldEmail: string, pw: string) => {
	return new Promise((response,reject) => {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				user.updateEmail(email).then(function() {
					// Update successful.
					console.log('successful')
					response()
				}, function(error) {
					// An error happened.
					reject(error)
				});
			} else {
				var cred = firebase.auth.EmailAuthProvider.credential(
					oldEmail,
					pw
				);
				user.reauthenticate(cred).then(function() {
					// User re-authenticated.
					user.updateEmail(email).then(function() {
						// Update successful.
						console.log('successful')
						response()
					}, function(error) {
						// An error happened.
						reject(error)
					});
				}, function(error) {
					// An error happened.
					reject(error)
				});
			}
		});



	})
}

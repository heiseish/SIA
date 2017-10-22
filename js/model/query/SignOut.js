//@flow
'use-strict';
import firebase from '../';
export default () => {
	return new Promise((response, reject) => {
		firebase.auth().signOut().then(() => {
		  // Sign-out successful.
		  response()
		},(error) => {
		  // An error happened.
		  reject(error)
		});
	})
	

}

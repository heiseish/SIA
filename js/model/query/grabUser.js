//@flow
'use-strict';
import firebase from '../';
const trainerRef = firebase.database().ref('trainers');
import userModel from '../trainer'
export default (userId: string, email: string, ...args :(?string)[]) => {
	return new Promise((response,reject) => {
		trainerRef.once('value').then((snap) =>{
			if (snap.hasChild(userId)) {
				//if found just return the object
				response(snap.child(userId).val())
			}
			else {
				// create
				let name: string = args[0] || ''
				let imageURI: string = args[1] || 'https://expertbeacon.com/sites/default/files/female_athlete_triad_eating_disorders_have_lasting_effects.jpg'
				let user = {
					...userModel,
					uid: userId,
					email: email,
					name: name,
					imageURI : imageURI
				}
				console.log(user)
				firebase.database().ref('users/' + userId).set(user);
				//then return the object
				firebase.database().ref('users/' + userId).once('value').then((snap) => {
					// return in this way to get a js object
					let user2 = snap.val();
					response(user2)
				})
			}

		})
	})

}

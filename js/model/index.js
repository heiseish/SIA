//@flow
'use-strict';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyBMaqd8Pcyl0Z0RHvU7_ekghxsneUjj9K8",
	authDomain: "defectmanager-68fad.firebaseapp.com",
	databaseURL: "https://defectmanager-68fad.firebaseio.com",
	projectId: "defectmanager-68fad",
	storageBucket: "defectmanager-68fad.appspot.com",
	messagingSenderId: "197197827948"
};

export default firebase.initializeApp(firebaseConfig);
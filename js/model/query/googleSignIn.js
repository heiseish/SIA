import firebase from '../'
import {GoogleSignin} from 'react-native-google-signin';
import grabUser from './grabUser'
export default googleSignIn = () => {
  return new Promise( function(response,reject){
    GoogleSignin.configure({
      // scopes: ["https://www.googleapis.com/auth/drive.readonly"], 
      iosClientId: '87490401580-4ujk0c7rji6iu5pchhgvpqp1dvout6lf.apps.googleusercontent.com',
    }).then(() => {
      GoogleSignin.signIn()
      .then(googleAuth => {
        var idToken = googleAuth.idToken;
        var accessToken = googleAuth.accessToken;

        var provider = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

        firebase.auth().signInWithCredential(provider).then(user => {
          user = user._user
          let name, photoURL
          if (user.providerData) {
            name = user.providerData[0].displayName
            photoURL = user.providerData[0].photoURL
          }
        // console.log(user)
        grabUser(user.uid, user.email, name, photoURL).then(res => response(res))
      }).catch(err => reject(err))
      }).catch(err => reject({message: 'cancel'}))
      .done();
    })
    
  });
}

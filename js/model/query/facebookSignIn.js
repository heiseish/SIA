//@flow
'use-strict';
import firebase from '../'
import grabUser from './grabUser'
import { AccessToken, LoginManager } from 'react-native-fbsdk';

export default () => {
  return new Promise((response,reject) => {
    LoginManager
    .logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        // return Promise.resolve('cancelled');
        reject(null)
      }
      // get the access token
      return AccessToken.getCurrentAccessToken();
    })
    .then(data => {
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      firebase.auth().signInWithCredential(credential).then(user => {
        user = user._user
        // console.log(user)
        grabUser(user.uid, user.email, user.displayName, user.photoURL).then(res => response(res))
      }).catch(err => reject(err))
    })
    .then((currentUser) => {
      if (currentUser === 'cancelled') {
      } else {
        // now signed in
      }
    })
    .catch((error) => reject(error));
  })
}

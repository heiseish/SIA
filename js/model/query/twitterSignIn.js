//@flow
'use-strict';
import firebase from '../'
import grabUser from './grabUser'
import {
  NativeModules
} from 'react-native';
const { RNTwitterSignIn } = NativeModules;

const Constants = {
    //Dev Parse keys
    TWITTER_COMSUMER_KEY: 'lomknlauKA6pZEocWCHeVxDJa',
    TWITTER_CONSUMER_SECRET: 'vvdGLbvMNee1VKQtxPx4GybJLi7OjRySedqPTPeLpCuCiQWOML',
};

export default () => {
  return new Promise( function(response,reject){
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
      RNTwitterSignIn.logIn()
        .then((loginData)=>{
          console.log(loginData);
          const { authToken, authTokenSecret } = loginData;
          }
        }).catch((error)=>{
          console.log(error);
        });
  });
}

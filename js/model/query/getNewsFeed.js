//@flow
'use-strict';
import firebase from '../';
import {NetInfo} from 'react-native';
import {err} from '../connection'

const newsRef = firebase.database().ref('news');
export default () => {
  return new Promise((response,reject) => {
    NetInfo.isConnected.fetch().then(isConnected => { if (!isConnected) reject(err)})
    let arr = []
    firebase.database().ref('newsFeed').once("value").then((snap)=>{
      snap.forEach((child)=>{
        // console.log(child.val())
        arr.push(child.val())
      })
      response(arr)

    }).catch(err => reject(err))
  })
}

//@flow
'use-strict';
import {NetInfo} from 'react-native';
import {err} from '../connection'
import firebase from '../';
const trainerRef = firebase.database().ref('trainers');
export default () => {
  return new Promise((response,reject) => {
    NetInfo.isConnected.fetch().then(isConnected => { 
      if (!isConnected) 
        reject(err)
      else {
        let arr = []
        let id = 0
        trainerRef.once("value").then((snap)=>{
          snap.forEach((child)=>{
            arr.push({
              ...child.val(),
              id: id++
            })
          })
          response(arr)

        })
      }
    })
  })
}

//@flow
'use-strict';
import firebase from '../';
import {NetInfo} from 'react-native';
import {err} from '../connection'

export default (clientsIds: Object) => {
  return new Promise((response,reject) => {
    NetInfo.isConnected.fetch().then(isConnected => { if (!isConnected) reject(err)})
    

    let arr = []
    //set unique id
    var id = 0


    for (var key in clientsIds) {
      if (key !== 'number') {
        firebase.database().ref('users/' + `${clientsIds[key]}`).once("value").then((snap)=>{
          let item = snap.val()
          arr.push({
            ...item,
            id: id++

          })

        })
      }
      


    }
    response(arr)
  })
}

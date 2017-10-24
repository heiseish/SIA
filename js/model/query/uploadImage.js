//@flow
'use-strict';
import firebase from '../'
import { getLastId } from './getLastId'
export const uploadImage = async (pickerResultAsByteArray : Uint8Array, progressCallback: (number) => void, onComplete: (string) => void) => {
  try {
    var metadata = {
      contentType: 'image/jpeg',
    };
    let id = await getLastId();
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(`images/${id}`)
    let uploadTask = ref.put(pickerResultAsByteArray, metadata)

    uploadTask.on('state_changed', function (snapshot) {

      progressCallback && progressCallback(snapshot.bytesTransferred / snapshot.totalBytes)

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');

    }, function (error) {
      // console.log("in _uploadAsByteArray ", error)
    }, function () {
      var downloadURL = uploadTask.snapshot.downloadURL;
      onComplete && onComplete(downloadURL);
    });


  } catch (ee) {
    // console.log("when trying to load _uploadAsByteArray ", ee)
  }
}
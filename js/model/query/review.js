//@flow
'use-strict';
import firebase from '../';
import {type Staff} from '../staff';
import {type Defect} from '../defect';
export const review = async (staff: Staff, defect: Defect, review: any, onComplete: () => void) => {
  try {
    let newDefect = {
      ...defect,
      status: 'completed',
      review
    }
    let newStaff = staff
    // doesn't have anything yet
    if (!newStaff.review)
    	newStaff.review = {
    		count: 1,
    		average: review.grade,

    	}
    else {
    	let count = newStaff.review.count
    	let average = newStaff.review.average
    	let newAverage = (count * average + review.grade)/(count + 1)
    	newStaff.review = {
    		...newStaff.review,
    		count: count + 1,
    		average: newAverage

    	}
    }

    await firebase.database().ref(`defects/${newDefect.id}`).set(newDefect)
    await firebase.database().ref(`staff/${staff.id}`).set(newStaff)
    await firebase.database().ref(`staff/${staff.id}/review`).push(review)
    onComplete();

  } catch (ee) {
    // console.log("when trying to load _uploadAsByteArray ", ee)
  }
}
//@flow
'use-strict';
import firebase from '../';
import {type Staff} from '../staff';
import {type Defect} from '../defect';
export const assign = async (supervisor: string, staff: Staff, defect: Defect, onComplete: () => void) => {
  try {
    let newDefect = {
      ...defect,
      supervisor: supervisor,
      status: 'assigned',
      staff: staff.name,
      staffId: staff.id
    }
    let newStaff = staff
    // doesn't have anything yet
    if (!newStaff.current)
      newStaff.current = {}
    newStaff.current[defect.id] = newDefect;

    await firebase.database().ref(`defects/${newDefect.id}`).set(newDefect)
    await firebase.database().ref(`staff/${staff.id}`).set(newStaff)
    onComplete();

  } catch (ee) {
    // console.log("when trying to load _uploadAsByteArray ", ee)
  }
}
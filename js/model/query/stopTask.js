//@flow
'use-strict';
import firebase from '../';
import {type Staff} from '../staff'
import {type Defect} from '../defect'
import { getTimeUnix } from '../../lib/timeUtil'
const time = getTimeUnix();
export const stopTask  = async (staff: Staff, defect: Defect) => {
	let newStaff = {
		...staff,
		status: 'free',
		defectClearedToday: staff.defectClearedToday + 1
	}
	delete newStaff.current[defect.id]

	await firebase.database().ref(`staff/${staff.id}/`).set(newStaff)
	await firebase.database().ref(`defects/${defect.id}/`).set({
		...defect,
		status: 'unchecked',
		endTime: time
	})
}

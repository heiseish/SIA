//@flow
'use-strict';
import firebase from '../';
import {type Staff} from '../staff'
import {type Defect} from '../defect'
import { getTimeUnix } from '../../lib/timeUtil'
const time = getTimeUnix();
export const startTask  = async (staff: Staff, defect: Defect) => {
	let newDefect = {
		...defect,
		status: 'ongoing',
		startTime: time
	}

	let newStaff = {
		...staff,
		status: 'busy'
	}
	newStaff.current[defect.id] = newDefect

	await firebase.database().ref(`staff/${staff.id}/`).set(newStaff)
	await firebase.database().ref(`defects/${defect.id}/`).set(newDefect)
}

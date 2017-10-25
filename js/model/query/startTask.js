//@flow
'use-strict';
import firebase from '../';
import {type Staff} from '../staff'
import {type Defect} from '../defect'
import { getTimeUnix } from '../../lib/timeUtil'
const time = getTimeUnix();
export const startTask  = async (staff: Staff, defect: Defect) => {
	await firebase.database().ref(`staff/${staff.id}/`).set({
		...staff,
		status: 'busy'
	})
	await firebase.database().ref(`defects/${defect.id}/`).set({
		...defect,
		status: 'ongoing',
		startTime: time
	})
}

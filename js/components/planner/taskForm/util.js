//@flow
'use-strict';
import { alert } from '../../common'

export const isValid = (...time: string[]) => {
	for (let i of time) {
		const hour = parseInt(i.substring(0, 2), 10)
		const minute = parseInt(i.substring(2), 10)
		if (i.length !== 4 || hour < 0  || hour >= 24 || minute < 0 || minute > 60) {
			alert(undefined, 'The time set for departure and/or arrival is invalid. Please check again')
			return false
		}
	}
	return true
}

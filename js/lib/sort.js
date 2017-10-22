//@flow
'use-strict';
import moment from 'moment';
let today = moment().format("DD MMMM YYYY");
export default (a: any,b: any) => {
	a = normalize(a)
	b = normalize(b)
	// comparing between sessions
	if (!a.hasOwnProperty('name')){
		if (moment(a,"hh:mm").isBefore(b))
			return -1
		else
			return 1
	}
	// } else {
	// 	//comparing between persons
	// 	if (moment(a.sessions[today].time.substring(0,5),"hh:mm").isBefore(b.sessions[today].time.substring(0,5)))
	// 		return -1
	// 	else
	// 		return 1
	// }
	
}

const normalize = (a: any) => {
	if (a.hasOwnProperty('name')) { //person
		return a.sessions[today].time.substring(0,5)
	} else {
		return a.time.substring(0,5)
	}
}
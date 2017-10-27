//@flow
'use-strict';
import moment from 'moment'

/**
* Data in the model is stored as Unix,
* Use the functions to generate string for display only
*/
export const getTimeUnix = () => {
	return moment().unix();
}

export const getPresentableDateAndTimeFromUnix = (unix: string) => {
	return moment.unix(unix).format("dddd, MMMM Do YYYY, h:mm:ss a");
}

export const getPresentableDate = (unix: string) => {
	const str = getPresentableDateAndTimeFromUnix(unix)
	return str.substring(0, str.lastIndexOf(','));
}

export const getPresentableTime = (unix: string) => {
	const str = getPresentableDateAndTimeFromUnix(unix)
	return str.substring(str.lastIndexOf(',') + 1);
}

export const getTimeFromUnix = (unix: string) => moment.unix(unix).format('HHmm')
export const getUnixFromTime = (time: string) => moment(time,'HHmm').unix()
export const getUnixFromTimeTomorrow = (time: string) => moment(time,'HHmm').add(1, 'days').unix()

export const interpretTime = (departure: string, arrival: string) => {
	const departureInAbs = parseInt(departure.substring(0, 2), 10) * 60 +  parseInt(departure.substring(2), 10)
	const arrivalInAbs = parseInt(arrival.substring(0, 2), 10) * 60 +  parseInt(arrival.substring(2), 10)
	if (departureInAbs >= arrivalInAbs) // arrival and departure on the same day
		return {
			arrival: getUnixFromTime(arrival),
			departure: getUnixFromTime(departure)
		}
	else {
		return {
			arrival: getUnixFromTime(arrival),
			departure: getUnixFromTimeTomorrow(departure)
		}
	}
}

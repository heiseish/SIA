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


//@flow
'use-strict';
import firebase from '../';
export const createTask  = (defect: any, creator: string) => {
	return new Promise((response,reject) => {
		if (!defect.name || defect.priority === NaN || !defect.description)
			reject({message: 'Please fill in all the blanks!'})
		else if (isNaN(defect.priority) || defect.priority < 1 || defect.priority > 3)
			reject({message: 'Priority should be 1-3 inclusively only!'})
		else 
			response("success")
	})
}

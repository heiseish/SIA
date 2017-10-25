//@flow
'use-strict';
const Defect = require('./defect');
const Planner = require('./planner');
const Supervisor = require('./supervisor');
const Staff = require('./staff');

export default {
	...Defect,
	...Planner,
	...Supervisor,
	...Staff
}
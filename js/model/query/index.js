//@flow
'use-strict';
const signIn = require('./signIn')
const createTask = require('./createTask')
const deleteTask = require('./deleteTask')
module.exports =  {
	...signIn,
	...createTask,
	...deleteTask
}
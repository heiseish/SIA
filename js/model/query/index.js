//@flow
'use-strict';
const signIn = require('./signIn')
const createTask = require('./createTask')
const deleteTask = require('./deleteTask')
const editTask = require('./editTask')
const uploadImage = require('./uploadImage')
const startTask = require('./startTask')
const stopTask = require('./stopTask')
module.exports =  {
	...signIn,
	...createTask,
	...deleteTask,
	...editTask,
	...uploadImage,
	...startTask,
	...stopTask
}
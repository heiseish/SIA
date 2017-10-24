//@flow
'use-strict';
const signIn = require('./signIn')
const createTask = require('./createTask')
const deleteTask = require('./deleteTask')
const editTask = require('./editTask')
const uploadImage = require('./uploadImage')
module.exports =  {
	...signIn,
	...createTask,
	...deleteTask,
	...editTask,
	...uploadImage
}
//@flow
'use-strict';
const user =require('./user')
const navigation = require('./navigation');
const tasks = require('./tasks')
module.exports =  {
	...user,
	...navigation,
	...tasks
}
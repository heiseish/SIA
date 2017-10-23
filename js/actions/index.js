//@flow
'use-strict';
const user =require('./user')
const navigation = require('./navigation');
module.exports =  {
	...user,
	...navigation
}
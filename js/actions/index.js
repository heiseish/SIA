//@flow
'use-strict';
const attendance =  require('./attendance')
const drawer = require('./drawer')
const  newsfeed =require('./newsfeed')
const  position =require('./position')
const sessions = require('./sessions')
const user =require('./user')

module.exports =  {
	...attendance,
	...drawer,
	...newsfeed,
	...position,
	...sessions,
	...user
}
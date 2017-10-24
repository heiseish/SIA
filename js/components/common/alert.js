//@flow
'use-strict';
/**
* Alert function buult on top of react native for convenience
* First params: function () => void or undefined: Optional callback function after the OK button is pressed
* ...params:
* if length is 1: params[0] is message
* if length is 2: params[0] is title, params[1] is message
* if length is 3 (only applicable if a defined function is provided): params[2] is whether there is a Cancel button
*/
export default (onComplete?: () => void, ...args : any[]) => {
	let Alert = require('Alert')
	if (onComplete) {
		if (args.length === 1)
			Alert.alert('Error',args[0],
				[
				{text: 'OK', onPress: () => onComplete()},
				],
				{ cancelable: false })
		else if (args.length === 2)
			Alert.alert(args[0],args[1],
				[
				{text: 'OK', onPress: () => onComplete()},
				{text: 'Cancel'}
				],
				{ cancelable: true })
		else if (args.length === 3 && !args[2])
			Alert.alert(args[0],args[1],
				[
				{text: 'OK', onPress: () => onComplete()},
				],
				{ cancelable: false })
	}

	else {
		if (args.length === 1)
			Alert.alert('Error',args[0],
				[
				{text: 'OK', onPress: () => {}}
				],
				{ cancelable: false })
		else if (args.length === 2)
			Alert.alert(args[0],args[1],
				[
				{text: 'OK', onPress: () => {}}
				],
				{ cancelable: false })
	}
}
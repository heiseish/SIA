//@flow
'use-strict';
export default (onComplete?: () => void, ...args :(?string)[]) => {
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
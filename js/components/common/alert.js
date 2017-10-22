//@flow
'use-strict';
export default (...args :(?string)[]) => {
	let Alert = require('Alert')
	if (args.length === 1)
		Alert.alert('Error',args[0],
	      [
	        {text: 'OK', onPress: () => {}},
	      ],
	      { cancelable: false })
	else if (args.length === 2)
		Alert.alert(args[0],args[1],
	      [
	        {text: 'OK', onPress: () => {}},
	      ],
	      { cancelable: false })
	else
		Alert.alert(args[0],args[1],
	      [
	        {text: 'OK', onPress: () => {args[2]()}},
	      ],
	      { cancelable: false })
}
//@flow
'use-strict';
export type Staff = {
	name: string,
	id: string,
	status: 'free' | 'busy',
	location?: string
}

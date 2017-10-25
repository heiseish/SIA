//@flow
'use-strict';
export type Defect = {
	name: string,
	id: number | string,
	priority: number,
	createdDate: string,
	description: string,
	image?: string,
	status: 'unattended' | 'assigned' | 'ongoing' | 'unchecked' | 'completed',
	creator: string,
	supervisor?: string,
	staff?: string,
	startTime?: string,
	endTime?: string,
	review?: string,
	grade?: number
}

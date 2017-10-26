//@flow
'use-strict';
export type Defect = {
	name: string,
	id: number | string,
	priority: 1 | 2 | 3,
	createdDate: string,
	description: string,
	image?: string,
	status: 'unattended' | 'assigned' | 'ongoing' | 'unchecked' | 'completed',
	creator: string,
	supervisor?: string,
	staff?: string,
	staffId?: string,
	startTime?: string,
	endTime?: string,
	review?: string,
	grade?: number
}

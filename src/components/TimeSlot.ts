export interface ITimeSlot {
	id: string;
	date: string;
	startTime: string;
	endTime: string;
	room: 'BLACK' | 'WHITE';
	available: boolean;
	profileId: string;
}

export interface ITimeSlot {
	id: string;
	available: boolean;
	date: Date;
	startTime: Date;
	endTime: Date;
	room: 'BLACK' | 'WHITE';
	profileId: string | null;
	stripeSessionId: string | null;
}

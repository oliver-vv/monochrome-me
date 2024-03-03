export interface ITimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
  roomType: 'black' | 'white';
  date: string;
}

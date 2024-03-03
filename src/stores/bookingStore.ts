import { writable } from 'svelte/store';

import type { ITimeSlot } from '../components/TimeSlot';

// export const bookings = writable<ITimeSlot[]>([]);

// export async function fetchBookings(userId: string, getUserBookedSlots: Function) {
// 	const fetchedBookings = await getUserBookedSlots(userId);
// 	bookings.set(fetchedBookings);
// }

export const selectedSlots = writable<ITimeSlot[]>([]);

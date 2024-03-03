import { compareAsc, format } from 'date-fns';
import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	addDoc,
	collection,
	doc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	updateDoc,
	where
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import type { ITimeSlot } from '../../components/TimeSlot';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

let firebaseApp;

if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}

export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();

console.log('auth: ', auth?.currentUser);

export async function getTimeSlotsForDate(date: string): Promise<ITimeSlot[]> {
	// const dateString = format(date, 'yyyy-MM-dd');
	console.log(date);
	const slotsRef = collection(db, 'slots', date, 'slots');

	// Query slots based on date and optionally roomType , where('date', '==', dateString)
	const q = query(slotsRef, where('available', '==', true));

	const querySnapshot = await getDocs(q);
	const slots: ITimeSlot[] = [];

	querySnapshot.forEach((doc) => {
		const data = doc.data();
		const startTime = new Date(data.startTime.seconds * 1000);
		const endTime = new Date(data.endTime.seconds * 1000);

		const berlinStartTime = convertTZ(startTime, 'Europe/Berlin');
		const berlinEndTime = convertTZ(endTime, 'Europe/Berlin');

		slots.push({
			id: doc.id,
			startTime: format(berlinStartTime, 'HH:mm'),
			endTime: format(berlinEndTime, 'HH:mm'),
			available: data.available,
			roomType: data.roomType,
			date: data.date
		});
	});

	// Sort slots by startTime
	return slots.sort((a, b) => compareAsc(a.startTime, b.startTime));
}

export async function updateTimeslotAvailability(
	date: string,
	slotId: string,
	newAvailability: boolean,
	userId?: string
) {
	console.log('updateTimeslotAvailability: ', date, slotId, userId, newAvailability);
	try {
		const slotDocRef = doc(db, 'slots', date, 'slots', slotId);

		if (userId) {
			await updateDoc(slotDocRef, { available: newAvailability, userId: userId });
		} else {
			await updateDoc(slotDocRef, { available: newAvailability });
		}

		console.log(
			`Timeslot ${slotId} on ${date} updated to ${newAvailability ? 'available' : 'not available'}`
		);
	} catch (error) {
		console.error('Error updating timeslot:', error);
	}
}

export async function getTimeslotsWithId(
	date: string,
	slotId: string,
	newAvailability: boolean,
	userId?: string
) {
	try {
		const slotDocRef = doc(db, 'slots', date, 'slots', slotId);

		if (userId) {
			await updateDoc(slotDocRef, { available: newAvailability, userId: userId });
		} else {
			await updateDoc(slotDocRef, { available: newAvailability });
		}

		console.log(
			`Timeslot ${slotId} on ${date} updated to ${newAvailability ? 'available' : 'not available'}`
		);
	} catch (error) {
		console.error('Error updating timeslot:', error);
	}
}

export async function createUserBooking(
	date: string,
	userId: string,
	slotIds: string[],
	name: string,
	stripeSessionId: string
) {
	try {
		// Define the booking details
		const bookingDetails = {
			date,
			slotIds,
			userId,
			stripeSessionId,
			status: 'confirmed' // Booking status
		};

		const bookingCollectionRef = collection(db, 'userBookings', userId, 'bookings');
		const docRef = await addDoc(bookingCollectionRef, bookingDetails);
		// Add the booking to the 'userBookings' collection under the user's document
		console.log('User Booking created with ID: ', docRef.id);
	} catch (error) {
		console.error('Error creating user booking:', error);
	}
}

export async function getUserBookedSlots(userId: string) {
	try {
		const userBookingsRef = collection(db, 'userBookings', userId, 'bookings');
		const querySnapshot = await getDocs(userBookingsRef);

		const bookedSlots: any[] = [];
		querySnapshot.forEach((doc) => {
			bookedSlots.push({ ...doc.data(), slotId: doc.id });
		});

		return bookedSlots;
	} catch (error) {
		console.error('Error fetching user bookings:', error);
		throw error;
	}
}

export async function cancelBookedSlot(slotId: string, dateString: string, userId: string) {
	try {
		await updateTimeslotAvailability(dateString, slotId, true);

		const docRef = doc(db, 'userBookings', userId, 'bookings', slotId);
		await updateDoc(docRef, { status: 'cancelled' });
	} catch (error) {
		console.error('Error cancelling booked slot:', error);
		throw error;
	}
}

function convertTZ(date: Date, tzString: string) {
	const dateObj = new Date(
		date.toLocaleString('en-US', {
			timeZone: tzString
		})
	);

	const diff = date.getTime() - dateObj.getTime();

	return new Date(date.getTime() - diff).toISOString();
}

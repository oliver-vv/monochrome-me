import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma'; // Make sure to import your initialized PrismaClient instance correctly

export const GET: RequestHandler = async ({ url }) => {
	// Extract the date from the query string
	const dateQuery = url.searchParams.get('date');

	// Basic validation for date query
	if (!dateQuery) {
		return new Response(
			JSON.stringify({
				error: 'Date parameter is required.'
			}),
			{ status: 400 }
		);
	}

	try {
		const selectedDate = new Date(dateQuery);

		// Ensuring the date is valid
		if (isNaN(selectedDate.getTime())) {
			throw new Error('Invalid date format.');
		}

		// Fetch slots for the selected date
		const slotsForSelectedDate = await prisma.slot.findMany({
			where: {
				date: selectedDate,
				available: true
			},
			orderBy: {
				room: 'asc'
			}
		});

		// Optionally, segregate slots by room if needed
		const blackRoomSlots = slotsForSelectedDate.filter((slot) => slot.room === 'BLACK');
		const whiteRoomSlots = slotsForSelectedDate.filter((slot) => slot.room === 'WHITE');

		return new Response(
			JSON.stringify({
				blackRoomSlots,
				whiteRoomSlots
			}),
			{ status: 200 }
		);
	} catch (err) {
		return new Response(
			JSON.stringify({
				error: (err as Error).message
			}),
			{ status: 500 }
		);
	}
};

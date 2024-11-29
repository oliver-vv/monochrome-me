import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma'; // Make sure to import your initialized PrismaClient instance correctly

export const GET: RequestHandler = async ({ url }) => {
	const dateQuery = url.searchParams.get('date');

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

		if (isNaN(selectedDate.getTime())) {
			throw new Error('Invalid date format.');
		}

		const slotsForSelectedDate = await prisma.slot.findMany({
			where: {
				date: selectedDate
			},
			orderBy: [{ room: 'asc' }, { startTime: 'asc' }]
		});

		// Separate slots by room type
		const whiteSlots = slotsForSelectedDate.filter((slot) => slot.room === 'WHITE');
		const blackSlots = slotsForSelectedDate.filter((slot) => slot.room === 'BLACK');

		console.log('Fetched slots:', { white: whiteSlots.length, black: blackSlots.length });

		return new Response(
			JSON.stringify({
				slots: {
					white: whiteSlots,
					black: blackSlots
				}
			}),
			{ status: 200 }
		);
	} catch (err) {
		console.error('Error fetching slots:', err);
		return new Response(
			JSON.stringify({
				error: (err as Error).message
			}),
			{ status: 500 }
		);
	}
};

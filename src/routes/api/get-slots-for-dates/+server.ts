import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { slots } from '@prisma/client';

type GroupedSlots = {
	[date: string]: {
		white: slots[];
		black: slots[];
	};
};

export const GET: RequestHandler = async ({ url }) => {
	const datesQuery = url.searchParams.get('dates');

	if (!datesQuery) {
		return new Response(JSON.stringify({ error: 'Dates parameter is required.' }), { status: 400 });
	}

	try {
		const dates = datesQuery.split(',').map((date) => new Date(date));

		if (dates.some((date) => isNaN(date.getTime()))) {
			throw new Error('Invalid date format.');
		}

		const slotsForDates = await prisma.slots.findMany({
			where: {
				date: {
					in: dates
				}
			},
			orderBy: [{ date: 'asc' }, { room: 'asc' }, { startTime: 'asc' }]
		});

		const groupedSlots: GroupedSlots = dates.reduce((acc, date) => {
			const dateString = date.toISOString().split('T')[0];
			acc[dateString] = {
				white: slotsForDates.filter(
					(slot) => slot.date.toISOString().startsWith(dateString) && slot.room === 'WHITE'
				),
				black: slotsForDates.filter(
					(slot) => slot.date.toISOString().startsWith(dateString) && slot.room === 'BLACK'
				)
			};
			return acc;
		}, {} as GroupedSlots);

		return new Response(JSON.stringify({ slots: groupedSlots }), { status: 200 });
	} catch (err) {
		console.error('Error fetching slots:', err);
		return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
	}
};

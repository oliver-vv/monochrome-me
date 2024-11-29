import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { startOfDay, endOfDay } from 'date-fns';

export const GET: RequestHandler = async () => {
	const today = new Date();
	const todayStart = startOfDay(today);
	const todayEnd = endOfDay(today);

	try {
		const bookedSlots = await prisma.slots.findMany({
			where: {
				date: {
					gte: todayStart,
					lte: todayEnd
				},
				available: false
			},
			orderBy: {
				startTime: 'asc'
			}
		});

		console.log('Fetched booked slots:', bookedSlots);

		return new Response(JSON.stringify({ bookedSlots }), { status: 200 });
	} catch (error) {
		console.error("Error fetching today's bookings:", error);
		return new Response(JSON.stringify({ error: 'Failed to fetch bookings' }), { status: 500 });
	}
};

// include: {
//     stripeSessions: {
//         select: {
//             userId: true
//         }
//     }
// }

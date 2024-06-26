import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ url }) => {
	const sessionId = url.searchParams.get('session_id');

	// Return an error response if the session ID is missing
	if (!sessionId) {
		return new Response(JSON.stringify({ error: 'Session ID is required' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	try {
		const stripeSession = await prisma.stripeSession.findUnique({
			where: {
				id: sessionId
			}
		});

		console.log('Check API: stripeSession:', stripeSession);

		if (!stripeSession) {
			return new Response(JSON.stringify({ error: 'Session not found' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		return new Response(
			JSON.stringify({
				confirmed: stripeSession.processed
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	} catch (error) {
		console.error('Error checking booking status:', error);
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};

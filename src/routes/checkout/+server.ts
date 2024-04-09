import type { RequestHandler } from './$types';
import { stripe } from '$lib/stripe/stripe';
import { env } from '$env/dynamic/private';
import type { ITimeSlot } from '../../components/TimeSlot';
import { prisma } from '$lib/server/prisma';

// TODO: add authentication for data!!

// Check whether the user is authenticated, and slotIds are valid -> to avoid double bookings

export const POST: RequestHandler = async ({ request }) => {
	const { uId, slotIds } = await request.json();
	if (!uId || !slotIds || !Array.isArray(slotIds) || slotIds.length === 0) {
		return new Response(JSON.stringify({ error: 'Missing or invalid parameters.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Check slot availability
	const slots = await prisma.slot.findMany({
		where: {
			id: { in: slotIds },
			available: true // Only fetch available slots
		}
	});

	if (slots.length !== slotIds.length) {
		return new Response(JSON.stringify({ error: 'One or more slots are not available.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const lineItems = slotIds.map((slot: any) => {
			return {
				price_data: {
					currency: 'EUR',
					product_data: {
						name: slot,
						images: []
					},
					// unit_amount has to be in cents -> price * 100

					// TODO: get price from somewhere
					unit_amount: 100 * 100
				},
				quantity: 1
			};
		});

		const session = await stripe.checkout.sessions.create({
			line_items: lineItems,
			mode: 'payment',
			shipping_address_collection: { allowed_countries: ['DE'] },
			success_url: `${env.BASE}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${env.BASE}/checkout/cancel`,
			phone_number_collection: {
				enabled: true
			}
		});

		const result = await prisma.$transaction(async (prisma) => {
			console.log('SlotIds: ', slotIds);

			const stripeSession = await prisma.stripeSession.create({
				data: {
					id: session.id,
					userId: uId,
					processed: false,
					slots: {
						connect: slots.map((slot: any) => ({ id: slot.id })) // Linking slots to this StripeSession
					}
				}
			});

			const slotUpdates = slotIds.map((slotId) =>
				prisma.slot.update({
					where: { id: slotId },
					data: { available: false, stripeSessionId: stripeSession.id }
				})
			);

			await Promise.all(
				slots.map((slot) =>
					prisma.slot.update({
						where: { id: slot.id },
						data: { available: false }
					})
				)
			);
		});

		return new Response(JSON.stringify({ url: session.url }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error processing checkout:', error);

		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};

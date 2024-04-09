import { stripe } from '$lib/stripe/stripe';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	console.log('Webhook received');

	const sig = request.headers.get('stripe-signature');
	const rawBody = await request.arrayBuffer(); // Get the raw request body

	// Convert ArrayBuffer to Buffer for Stripe
	// Non-Node.js environment: Consider using a polyfill or alternative approach
	const bufferBody = Buffer.from(rawBody);
	const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

	if (!sig || !webhookSecret) {
		console.error('Missing Stripe Signature or Webhook Secret');
		return new Response('Webhook configuration error', { status: 400 });
	}

	let event;

	try {
		event = stripe.webhooks.constructEvent(bufferBody, sig, webhookSecret!);
	} catch (err) {
		// include error message?
		console.error(`Webhook Error: ${err}`);
		return new Response(`Webhook Error: ${err}`, { status: 400 });
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object;

		try {
			const stripeSession = await prisma.stripeSession.findUnique({
				where: { id: session.id },
				include: { slots: true }
			});

			if (!stripeSession) throw new Error('Stripe session not found');

			if (!stripeSession) {
				console.error('StripeHook: Session not found');
				return new Response('Session not found', { status: 404 });
			}

			if (!stripeSession.processed) {
				await prisma.stripeSession.update({
					where: {
						id: session.id
					},
					data: {
						processed: true
					}
				});

				await Promise.all(
					stripeSession.slots.map((slot) =>
						prisma.slot.update({
							where: {
								id: slot.id
							},
							data: {
								available: false,
								profileId: stripeSession.userId // Link the user's profile ID to each Slot
							}
						})
					)
				);

				// Implement additional logic as needed
			}
		} catch (err) {
			console.error(`Processing error: ${(err as Error).message}`, { sessionID: session.id });
			return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
		}
	}

	return new Response(JSON.stringify({ received: true }), { status: 200 });
};

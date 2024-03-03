import { stripe } from '$lib/stripe/stripe';
import { db, updateTimeslotAvailability } from '$lib/firebase/firebase';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
  console.log('Webhook received');

  const sig = request.headers.get('stripe-signature');
  const rawBody = await request.arrayBuffer(); // Get the raw request body

  // Convert ArrayBuffer to Buffer for Stripe
  // Non-Node.js environment: Consider using a polyfill or alternative approach
  const bufferBody = Buffer.from(rawBody);

  if (!sig) {
    console.error('Webhook Error: Missing Stripe Signature');
    return new Response('Missing Stripe Signature', { status: 400 });
  }

  let event;

  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  console.log('Webhook secret:', webhookSecret); // This should not log 'undefined'

  try {
    // assert that webhookSecret is not undefined
    event = stripe.webhooks.constructEvent(bufferBody, sig, webhookSecret!);
  } catch (err) {
    // include error message?
    console.error(`Webhook Error: ${err}`);
    return new Response(`Webhook Error: ${err}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const sessionDocRef = doc(db, 'stripeSessions', session.id);

    if (!session.metadata) {
      console.error('StripeHook: Session metadata not found');
      return new Response('Session metadata not found', { status: 404 });
    }

    const { slotIds, userId, date } = session.metadata;

    if (!slotIds || !userId || !date) {
      console.error('StripeHook: Session metadata is incomplete');
      return new Response('Session metadata is incomplete', { status: 400 });
    }

    const sessionDoc = await getDoc(sessionDocRef);
    if (!sessionDoc.exists()) {
      console.error('StripeHook: Session document not found');
      return new Response('Session document not found', { status: 404 });
    }

    if (!sessionDoc.data().processed) {
      await updateDoc(sessionDocRef, { processed: true });

      for (const slotId of slotIds) {
        updateTimeslotAvailability(date, slotId, false, userId);
      }

      // Implement logic to update user bookings based on session metadata
      // This might involve updating Firestore documents for booked slots and user bookings

      console.log(`Processed session: ${session.id}`);
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};

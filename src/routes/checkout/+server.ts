import type { RequestHandler } from './$types';
import { stripe } from '$lib/stripe/stripe';
import { env } from '$env/dynamic/private';
import type { ITimeSlot } from '../../components/TimeSlot';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db, getTimeSlotsForDate } from '$lib/firebase/firebase';

// TODO: add authentication for data!!

export const POST: RequestHandler = async ({ request }) => {
  const { uId, date, slots } = await request.json();
  const slotIds = slots.map((slot: ITimeSlot) => slot.id);

  const lineItems = slots.map((slot: any) => {
    return {
      price_data: {
        currency: 'EUR',
        product_data: {
          name: slot.time,
          images: []
        },
        // unit_amount has to be in cents -> price * 100

        // TODO: get price from somewhere
        unit_amount: 10 * 100
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
    },
    metadata: {
      slotIds: JSON.stringify(slotIds),
      userId: JSON.stringify(uId),
      date: JSON.stringify(date)
    }
  });

  await setDoc(doc(db, 'stripeSessions', session.id), {
    userId: uId,
    slotIds: slotIds,
    processed: false
  });

  // return sessionID ?
  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

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
    // Retrieve the session document from Firestore
    const sessionDocRef = doc(db, 'stripeSessions', sessionId);
    const sessionDoc = await getDoc(sessionDocRef);

    if (!sessionDoc.exists()) {
      return new Response(JSON.stringify({ error: 'Session not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Extract the processed flag to determine if the booking has been confirmed
    const { processed } = sessionDoc.data();

    return new Response(
      JSON.stringify({
        confirmed: processed
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

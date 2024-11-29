import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts';
import type { SetmoreWebhookPayload } from '../_shared/types.ts';

Deno.serve(async (req) => {
	// Check for API key
	const apiKey = req.headers.get('x-api-key');
	if (apiKey !== Deno.env.get('SETMORE_WEBHOOK_API_KEY')) {
		return new Response('Unauthorized', { status: 401 });
	}

	try {
		const data = (await req.json()) as SetmoreWebhookPayload;

		const clientEmail = data['customer.email'];
		const clientName = data['customer.name'];
		const appointmentId = data['booking.id'];

		if (!clientEmail) {
			return new Response('Missing required field: email', { status: 400 });
		}

		const token = crypto.randomUUID();
		const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

		// Create folders for both full-size and thumbnails
		const folders = ['full', 'thumb'];
		for (const folder of folders) {
			const { error: folderError } = await supabaseAdmin.storage
				.from('client-images')
				.upload(`${appointmentId}/${folder}/.keep`, new Uint8Array(0));

			if (folderError && folderError.message !== 'The resource already exists') {
				console.error(`Storage Error (${folder}):`, folderError);
				return new Response('Failed to create storage folder', { status: 500 });
			}
		}

		// Store token
		const { error: tokenError } = await supabaseAdmin.from('download_tokens').insert([
			{
				client_email: clientEmail,
				client_name: clientName,
				token,
				expires_at: expiresAt.toISOString(),
				appointment_id: appointmentId
			}
		]);

		if (tokenError) {
			console.error('Token Error:', tokenError);
			return new Response('Failed to create token', { status: 500 });
		}

		return new Response(
			JSON.stringify({
				message: 'Success',
				token,
				clientEmail,
				clientName,
				appointmentId
			}),
			{ headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		console.error('Webhook Error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
});

/* To invoke locally:
  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/webhookSetmore' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'
*/

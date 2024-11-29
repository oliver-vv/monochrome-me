import { supabaseAdmin } from '../_shared/supabaseAdmin.ts';
import { ZipWriter, BlobWriter, Uint8ArrayReader } from 'https://deno.land/x/zipjs/index.js';

Deno.serve(async (req) => {
	if (req.method === 'OPTIONS') {
		return new Response('ok', {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
				'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
			}
		});
	}

	try {
		const { token, paths } = await req.json();

		// Verify token
		const { data: downloadToken, error: tokenError } = await supabaseAdmin
			.from('download_tokens')
			.select('*')
			.eq('token', token)
			.gt('expires_at', new Date().toISOString())
			.single();

		if (tokenError || !downloadToken) {
			return new Response('Invalid or expired token', { status: 401 });
		}

		// Get signed URLs for all images
		const { data: signedUrls } = await supabaseAdmin.storage
			.from('client-images')
			.createSignedUrls(paths, 600);

		if (!signedUrls) {
			throw new Error('Failed to get signed URLs');
		}

		// Return the URLs and metadata immediately
		return new Response(
			JSON.stringify({
				urls: signedUrls,
				appointmentId: downloadToken.appointment_id,
				filename: `photos-${downloadToken.appointment_id}.zip`
			}),
			{
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			}
		);
	} catch (error) {
		console.error('Error:', error);
		return new Response(JSON.stringify({ error: 'Failed to prepare download' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
	}
});

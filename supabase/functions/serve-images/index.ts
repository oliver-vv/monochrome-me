import { supabaseAdmin } from '../_shared/supabaseAdmin.ts';

Deno.serve(async (req) => {
	try {
		const url = new URL(req.url);
		const token = url.searchParams.get('token');

		if (!token) {
			return new Response('Token is required', { status: 400 });
		}

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

		// List images from full-size folder
		const { data: listData, error: listError } = await supabaseAdmin.storage
			.from('client-images')
			.list(`${downloadToken.appointment_id}/full`);

		if (listError) {
			return new Response('Failed to fetch images', { status: 500 });
		}

		const files = listData.filter((file) => file.name !== '.keep');

		// Create signed URLs for thumbnails
		const { data: thumbnailUrls } = await supabaseAdmin.storage
			.from('client-images')
			.createSignedUrls(
				files.map((file) => `${downloadToken.appointment_id}/thumb/${file.name}`),
				600
			);

		const response = {
			images: thumbnailUrls.map((item) => ({
				...item,
				thumbnailUrl: item.signedUrl,
				fullSizePath: item.path.replace('/thumb/', '/full/')
			})),
			appointmentId: downloadToken.appointment_id,
			clientName: downloadToken.client_name
		};

		return new Response(JSON.stringify(response), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
});

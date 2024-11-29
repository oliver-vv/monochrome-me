import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	try {
		const data = await request.json();

		console.log('Received webhook data:', JSON.stringify(data, null, 2));

		const clientEmail = data['customer.email'];
		const clientName = data['customer.name'];
		const appointmentId = data['booking.id'];

		if (!clientEmail) {
			console.error('Missing required field: email');
			return new Response('Missing required field: email', { status: 400 });
		}

		// Generate a secure token
		const token = crypto.randomUUID();
		const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // Token valid for 48 hours

		// Create a folder in Supabase Storage
		const { data: folderData, error: folderError } = await supabase.storage
			.from('client-images')
			.upload(`${appointmentId}/.keep`, new Uint8Array(0));

		if (folderError && folderError.message !== 'The resource already exists') {
			console.error('Supabase Storage Error:', folderError);
			return new Response('Failed to create storage folder', { status: 500 });
		}

		// Store token and client info using Prisma
		const downloadToken = await prisma.download_tokens.create({
			data: {
				client_email: clientEmail,
				client_name: clientName,
				token,
				expires_at: expiresAt,
				appointment_id: appointmentId
			}
		});

		// For testing purposes, return the token and client info
		return json({
			message: 'Data received and stored successfully',
			token,
			clientEmail,
			clientName,
			appointmentId
		});
	} catch (error) {
		console.error('Webhook Error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
};

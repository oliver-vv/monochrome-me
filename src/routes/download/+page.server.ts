import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		throw error(400, 'Token is required');
	}

	const response = await fetch(`${PUBLIC_SUPABASE_URL}/functions/v1/serve-images?token=${token}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${PUBLIC_SUPABASE_ANON_KEY}`
		}
	});

	if (!response.ok) {
		throw error(response.status, await response.text());
	}

	const data = await response.json();
	return data;
};

import { redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';

export const POST = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;

	console.log('signing out...');

	const { error } = await supabase.auth.signOut();
	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400, // Bad Request or another appropriate status code
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} else {
		setFlash({ type: 'success', message: 'Successfully logged out!' }, event.cookies);

		// return new Response(null, { status: 200 });
		throw redirect(303, '/');
	}
};

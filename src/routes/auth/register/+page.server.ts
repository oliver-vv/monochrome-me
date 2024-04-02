import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { registerSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(registerSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		// Proceed with Supabase authentication if validation succeeds
		const { supabase } = event.locals;
		const { data, error } = await supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				emailRedirectTo: 'https://example.com/welcome'
			}
		});
		if (error) {
			// Handle the error, e.g., by returning a specific message to the client
			fail(401, { form });
		} else {
			// return { form };
			// Optionally, redirect users after successful login
			throw redirect(303, '/dashboard');
		}
	}
};

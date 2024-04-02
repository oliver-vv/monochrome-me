import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';

import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { loginSchema } from './schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		// Proceed with Supabase authentication if validation succeeds
		const { supabase } = event.locals;
		const { data, error } = await supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});
		if (error) {
			// Handle the error, e.g., by returning a specific message to the client
			fail(401, { form });
		} else {
			return { form };
		}
	}
};

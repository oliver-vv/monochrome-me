import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';

import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from './schema';

import { redirect, setFlash } from 'sveltekit-flash-message/server';
import { error } from '@sveltejs/kit';

import * as flashModule from 'sveltekit-flash-message/client';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return message(form, 'Invalid form', {
				status: 400
			});
		}

		// Proceed with Supabase authentication if validation succeeds
		const { supabase } = event.locals;
		const { data, error } = await supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});

		if (error) {
			return message(form, error.message, {
				status: 401
			});
		} else {
			const redirectTo = event.url.searchParams.get('redirect') || '/dashboard';
			redirect(redirectTo, { type: 'success', message: 'Successfully logged in!' }, event.cookies);
		}
	}
};

import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { registerSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(registerSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerSchema));
		if (!form.valid) {
			return message(form, 'Invalid form', {
				status: 400
			});
		}

		// Proceed with Supabase authentication if validation succeeds
		const { supabase } = event.locals;
		const { data, error } = await supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					first_name: form.data.first_name,
					last_name: form.data.last_name
				}
			}
		});
		if (error) {
			return message(form, error.message, {
				status: 401
			});
		} else {
			redirect(
				'/dashboard',
				{ type: 'success', message: 'Successfully registered!' },
				event.cookies
			);
		}
	}
};

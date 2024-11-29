import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createServerClient } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';
import { UserRole } from './types/UserRole';
import { prisma } from '$lib/server/prisma';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			/**
			 * Note: You have to add the `path` variable to the
			 * set and remove method due to sveltekit's cookie API
			 * requiring this to be set, setting the path to an empty string
			 * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
			 */
			set: (key, value, options) => {
				event.cookies.set(key, value, { ...options, path: '/' });
			},
			remove: (key, options) => {
				event.cookies.delete(key, { ...options, path: '/' });
			}
		}
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	// Attempt to retrieve the session
	const {
		data: { session }
	} = await event.locals.supabase.auth.getSession();

	// Check if the route is admin and user is not authenticated
	if (event.url.pathname.startsWith('/admin')) {
		if (!session) {
			throw redirect(302, '/auth/login?redirect=/admin');
		}

		// Fetch user role using Prisma
		const profile = await prisma.profiles.findUnique({
			where: { id: session.user.id },
			select: { role: true }
		});

		if (!profile || profile.role !== UserRole.Admin) {
			throw redirect(302, '/');
		}
	}

	// Add more protected routes as needed
	const protectedRoutes = ['/dashboard'];
	const isProtected = protectedRoutes.includes(event.url.pathname);

	if (isProtected && !session) {
		// User is not authenticated, redirect to the login page
		throw redirect(302, '/auth/login');
	}

	// redirect to dashbaord if user is authenticated
	if (
		session &&
		(event.url.pathname === '/auth/register' || event.url.pathname === '/auth/login')
	) {
		throw redirect(302, `/dashboard`);
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};

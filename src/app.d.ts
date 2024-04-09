import { SupabaseClient, Session } from '@supabase/supabase-js';
import type { PrismaClient } from '@prisma/client';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
			flash?: { type: 'success' | 'error'; message: string };
		}
		// interface Error {}
		// interface Platform {}
	}

	var prisma: PrismaClient;
}

export {};

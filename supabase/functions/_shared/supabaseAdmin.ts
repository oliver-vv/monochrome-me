import { createClient } from 'jsr:@supabase/supabase-js@2';

// Try both naming conventions (Supabase Edge Function standard and SvelteKit public)
const supabaseUrl = Deno.env.get('SUPABASE_URL') || Deno.env.get('PUBLIC_SUPABASE_URL');
const serviceRoleKey =
	Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SECTRET_SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !serviceRoleKey) {
	throw new Error('Missing Supabase environment variables');
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

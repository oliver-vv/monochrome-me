import { createClient } from 'jsr:@supabase/supabase-js@2';

// Try both naming conventions (Supabase Edge Function standard and SvelteKit public)
const supabaseUrl = Deno.env.get('SUPABASE_URL') || Deno.env.get('PUBLIC_SUPABASE_URL');
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') || Deno.env.get('PUBLIC_SUPABASE_ANON_KEY');

if (!supabaseUrl || !anonKey) {
	throw new Error('Missing Supabase environment variables');
}

export const supabaseAdmin = createClient(supabaseUrl, anonKey);

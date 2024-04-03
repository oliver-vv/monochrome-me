<script lang="ts">
	// import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import { toast } from 'svelte-sonner';
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';

	export let data;
	let { supabase } = data;

	supabase.auth
		.getSession()
		.then((session) => {
			console.log(session);
		})
		.catch((error) => {
			console.log(error);
		});

	const flash = getFlash(page);

	$: if ($flash) {
		console.log('flash', $flash);
		toast($flash.message);

		// Clear the flash message to avoid double-toasting.
		$flash = undefined;
	}

	onMount(() => {
		// const unsubscribe = session.subscribe(($session: { justLoggedIn: any }) => {
		// 	// Check for the flag and display the toast
		// 	if ($session.justLoggedIn) {
		// 		toast.success('Login successful. Welcome back!');
		// 	}
		// });
		// return unsubscribe; // Cleanup the subscription when the component is destroyed
	});
</script>

<p>TEst</p>

<script lang="ts">
	// import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import { toast } from 'svelte-sonner';

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

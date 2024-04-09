<script lang="ts">
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	// supabase.auth
	// 	.getSession()
	// 	.then((session) => {
	// 		console.log(session);
	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 	});

	// $: console.log('session in dashboard', session);
</script>

<p>TEst</p>

<script lang="ts">
	import '../app.pcss';

	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import { onMount } from 'svelte';

	import Footer from '$lib/components/ui/footer/footer.svelte';

	onMount(() => {
		console.log('Mounted');
	});

	export let data;
</script>

<div class="flex flex-col min-h-screen">
	<Navbar {data} />

	<main class="flex-1 flex justify-center items-center">
		<!-- py-10 -->
		<div class=" w-full mx-auto max-w-7xl sm:px-6 lg:px-8">
			<!-- Main content goes here -->

			<slot />
		</div>
	</main>

	<Footer />
</div>

<script lang="ts">
	import '../app.pcss';

	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import { onMount } from 'svelte';

	import Footer from '$lib/components/ui/footer/footer.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	onMount(() => {
		console.log('Mounted');
	});

	export let data;

	import { setMode, mode } from 'mode-watcher';
	import { toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';

	setMode('light');

	const flash = getFlash(page);
	$: if ($flash) {
		console.log('flash', $flash);
		toast($flash.message);

		// Clear the flash message to avoid double-toasting.
		$flash = undefined;
	}
</script>

<ModeWatcher defaultMode={'light'}></ModeWatcher>
<Toaster theme="light" />

<div class="flex flex-col min-h-screen">
	<Navbar {data} />

	<main class="flex-1 flex justify-center items-center">
		<div class=" w-full mx-auto max-w-7xl sm:px-6 lg:px-8">
			<!-- Main content goes here -->

			<slot />
		</div>
	</main>

	<Footer />
</div>

<!-- <div class=" bg-background"></div> -->

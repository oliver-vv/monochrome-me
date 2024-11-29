<script lang="ts">
	import '../app.pcss';

	import Navbar from '$lib/components/ui/navbar/navbar.svelte';

	import Footer from '$lib/components/ui/footer/footer.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	export let data;

	import { setMode, mode } from 'mode-watcher';
	import { toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';

	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	setMode('light');

	const flash = getFlash(page);
	$: if ($flash) {
		toast($flash.message);
		// Clear the flash message to avoid double-toasting.
		$flash = undefined;
	}

	// TODO: Remove this
	injectSpeedInsights();
</script>

<ModeWatcher defaultMode={'light'}></ModeWatcher>

<Toaster theme="light" richColors position="bottom-right" />

{#if $page.url.pathname.startsWith('/admin')}
	<div class="flex min-h-screen flex-col bg-[#FFFBF2]">
		<main class="flex flex-1 items-center justify-center">
			<slot />
		</main>
	</div>
{:else}
	<div class="flex min-h-screen flex-col bg-[#FFFBF2]">
		<!-- <Navbar {data} /> -->
		<main class="flex-1 items-center justify-center">
			<slot />
		</main>
		<Footer />
	</div>
{/if}

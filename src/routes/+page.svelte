<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Autoscroll from 'embla-carousel-auto-scroll';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card/index.js';
	import WhoWeAre from '$lib/components/landing/WhoWeAre.svelte';

	export let data: any;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(async () => {
		const { data, error } = await supabase.auth.getSession();
		console.log('data:', data.session);
		session = data.session;
	});
	console.log('session:', session);

	// import { browser } from '$app/environment';
	// import BlogCard from '$lib/components/landing/BlogCard.svelte';
	// let windowWidth: number;
	// let isMobile: boolean;

	// onMount(() => {
	// 	if (browser) {
	// 		windowWidth = window.innerWidth;
	// 		const handleResize = () => {
	// 			windowWidth = window.innerWidth;
	// 		};
	// 		window.addEventListener('resize', handleResize);
	// 		return () => window.removeEventListener('resize', handleResize);
	// 	}
	// });

	// $: isMobile = windowWidth < 768; // Adjust this breakpoint as needed
</script>

<main class="w-full">
	<!-- w-[1120px] mx-auto h-screen -->

	<section
		class="flex h-[calc(100vh-100px)] w-full items-center justify-center border border-red-500 bg-slate-800"
	>
		<h1 class="tablet:text-[96px] ml-2 border border-blue-900 text-[48px] font-bold text-red-800">
			Monochrome Me
		</h1>
	</section>

	<!-- <WhoWeAre /> -->
</main>

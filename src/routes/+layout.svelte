<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/stores';

	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import { onMount } from 'svelte';

	import * as Sheet from '$lib/components/ui/sheet';

	import { user } from '../stores/authStore';
	import { Button } from '$lib/components/ui/button';
	import Footer from '$lib/components/ui/footer/footer.svelte';

	import { auth } from '$lib/firebase/firebase';

	import * as Card from '$lib/components/ui/card';

	const nonAuthRoutes = ['/', '/login'];

	onMount(() => {
		console.log('Mounted');
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;

			if (!user && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = '/login';
				return;
			}

			if (user && currentPath === '/login') {
				window.location.href = '/dashboard';
				return;
			}
		});
	});
</script>

<div class="min-h-full">
	<Navbar />

	<div class="py-10">
		<main>
			<div class="mx-auto max-w-7xl sm:px-6 lg:px-8 h-screen justify-between flex flex-col">
				<div class="mb-auto">
					<slot />
				</div>
				<Footer />
			</div>
		</main>
	</div>
</div>

<script lang="ts">
	import Logo from '$lib/components/ui/navbar/Logo.svelte';
	import { Button } from '../button';
	import UserMenu from '$lib/components/ui/navbar/UserMenu.svelte';
	import AuthButtons from '$lib/components/ui/navbar/AuthButtons.svelte';
	import { page } from '$app/stores';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { invalidateAll } from '$app/navigation';

	export let data: { supabase: SupabaseClient; session: Session | null };

	$: ({ supabase, session } = data);

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Book Now', href: '/booking' },
		{ label: 'About Us', href: '/about-us' },
		{ label: 'FAQ', href: '/faq' }
	];

	let navContainer: HTMLDivElement;
	$: activeItem = tweened({ width: 0, left: 0, opacity: 0 }, { duration: 300, easing: cubicOut });

	$: if (navContainer) updateActiveItem($page.url.pathname);

	function updateActiveItem(pathname: string) {
		if (!navContainer) return;

		const activeButton = navContainer.querySelector(`[href="${pathname}"]`);
		if (activeButton) {
			const rect = activeButton.getBoundingClientRect();
			const containerRect = navContainer.getBoundingClientRect();
			activeItem.set({
				width: rect.width,
				left: rect.left - containerRect.left,
				opacity: 1
			});
		} else {
			activeItem.set({ width: 0, left: $activeItem.left, opacity: 0 });
		}
	}

	async function logout() {
		const { error } = await supabase.auth.signOut();
		if (error) console.error('Error logging out:', error);
		await invalidateAll();
	}
</script>

<nav class="sticky z-50 mt-4">
	<div class="flex min-h-[82px] w-full items-center justify-between px-28 max-md:px-5">
		<a href="/" class="block h-24 w-24 p-2">
			<Logo />
		</a>

		<div class="relative flex gap-5" bind:this={navContainer}>
			{#each navItems as item}
				<div class="relative" class:active={$page.url.pathname === item.href}>
					<Button
						variant="ghost"
						href={item.href}
						class="font-mono text-base font-medium text-[#2d2d2d] hover:bg-transparent"
					>
						{item.label}
					</Button>
				</div>
			{/each}
			{#if $activeItem}
				<div
					class="absolute h-0.5 bg-[#2d2d2d] transition-all duration-300"
					style:width="{$activeItem.width}px"
					style:transform="translateX({$activeItem.left}px)"
					style:opacity={$activeItem.opacity}
					style:bottom="-8px"
				></div>
			{/if}
		</div>

		<!-- {#if session}
			<UserMenu {session} {logout} />
		{:else}
			<AuthButtons />
		{/if} -->
	</div>
</nav>

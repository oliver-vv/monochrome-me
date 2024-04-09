<script lang="ts">
	import { Button } from '../button';
	import NavbarDesktop from './navbar-desktop.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import Separator from '../separator/separator.svelte';

	export let data: any;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	async function logout() {
		const response = await fetch('/auth/logout', { method: 'POST' });

		if (response.ok) {
			// If the logout was successful, redirect the user
			window.location.href = '/';
		} else {
			// Handle error case
			const result = await response.json();
			console.error('Logout failed:', result.error);
		}
	}
</script>

<nav>
	<div class="sticky mt-5 z-50">
		<!-- <NavbarDesktop {data} /> -->
		<div class="flex w-[1120px] h-10 justify-between items-center flex-shrink-0 mx-auto">
			<a href="/">
				<img class="p-2 block h-20 w-auto" src="/logo.png" alt="Monochrome Me" />
			</a>
			<div class="flex gap-5">
				<Button variant="ghost" href="/booking">Book Now</Button>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button variant="ghost">Dashbaord</Button>
					</DropdownMenu.Trigger>
					<!-- 15px offset -->
					<DropdownMenu.Content sideOffset={15} class="w-40">
						<DropdownMenu.Group class="grid gap-1">
							<DropdownMenu.Label class="h-8">My Dashboard</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item href="/sessions" class="h-10">Sessions</DropdownMenu.Item>
							<DropdownMenu.Item href="/downloads" class="h-10">Downloads</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<Button variant="ghost" href="/about-us">About Us</Button>
				<Button variant="ghost" href="/faq">FAQ</Button>
			</div>

			{#if session}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root>
							<Avatar.Fallback>{session?.user?.email?.slice(0, 1).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<!-- 15px offset -->
					<DropdownMenu.Content sideOffset={15} class="w-40">
						<DropdownMenu.Group class="grid gap-1">
							<DropdownMenu.Label class="h-8">My Account</DropdownMenu.Label>
							<DropdownMenu.Item class="h-10">Profile</DropdownMenu.Item>
							<DropdownMenu.Item class="h-10">Settings</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item on:click={logout} class="h-10">Sign Out</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<div class="flex gap-4">
					<Button variant="secondary" href="/auth/login">Login</Button>
					<Button href="/auth/register">Register</Button>
				</div>
			{/if}
		</div>
	</div>
</nav>

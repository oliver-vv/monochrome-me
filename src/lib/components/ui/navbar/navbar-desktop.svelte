<script lang="ts">
	import Separator from './../separator/separator.svelte';
	import { Button } from '../button';
	import * as Popover from '../popover';
	import NavbarMobile from './navbar-mobile.svelte';
	import * as Avatar from '$lib/components/ui/avatar';

	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import * as Card from '$lib/components/ui/card';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { goto, invalidate } from '$app/navigation';
	import { fail } from '@sveltejs/kit';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	export let data: any;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let expanded = false;

	// Animated value for the rotation, starts at 0 degrees
	const rotation = tweened(0, {
		duration: 300,
		easing: cubicOut
	});

	// Function to toggle dropdown and animate chevron
	function toggleDropdown() {
		expanded = !expanded;
		rotation.set(expanded ? 180 : 0);
	}

	function checkLogin() {
		if (!session) {
			isOpen = true;
		}
	}

	let isOpen = false;

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

display: flex; width: 1120px; height: 40px; justify-content: space-between; align-items: center;
flex-shrink: 0;

<!-- border-b border-gray-200 -->
<nav class=" bg-white">
	<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
		<div class="flex h-16 justify-between items-center">
			<div class="flex items-center">
				<div class="flex flex-shrink-0">
					<a href="/">
						<!-- mine -->
						<img class="p-2 block h-20 w-auto lg:hidden" src="/logo.png" alt="Monochrome Me" />
					</a>
					<a href="/">
						<!-- mine -->
						<img class=" p-2 hidden h-20 w-auto lg:block" src="/logo.png" alt="Monochrome Me" />
					</a>
				</div>

				<div class="hidden lg:-my-px lg:ml-6 lg:flex lg:space-x-8">
					<!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
					<Button variant="ghost" href="/booking">Book Now</Button>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button variant="ghost">Dashbaord</Button>
						</DropdownMenu.Trigger>
						<!-- 15px offset -->
						<DropdownMenu.Content sideOffset={15}>
							<DropdownMenu.Label>My Dashboard</DropdownMenu.Label>
							<div class="grid grid-flow-col">
								<DropdownMenu.Group class=" w-60">
									<DropdownMenu.Label>My Dashboard</DropdownMenu.Label>
									<p>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet maiores
										exercitationem mollitia dignissimos officiis corporis.
									</p>
								</DropdownMenu.Group>
								<DropdownMenu.Group class=" w-60">
									<DropdownMenu.Label>My Dashboard</DropdownMenu.Label>
									<DropdownMenu.Item href="/sessions">Sessions</DropdownMenu.Item>
									<DropdownMenu.Item href="/downloads">Downloads</DropdownMenu.Item>
								</DropdownMenu.Group>
							</div>
						</DropdownMenu.Content>
					</DropdownMenu.Root>

					<Button variant="ghost" href="/about-us">About Us</Button>
					<Button variant="ghost" href="/faq">FAQ</Button>
				</div>
			</div>
			{#if session}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root>
							<Avatar.Fallback>{session?.user?.email?.slice(0, 1).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<!-- 15px offset -->
					<DropdownMenu.Content sideOffset={15}>
						<DropdownMenu.Group>
							<DropdownMenu.Label>My Account</DropdownMenu.Label>
							<DropdownMenu.Item>Profile</DropdownMenu.Item>
							<DropdownMenu.Item>Settings</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item on:click={logout}>Sign Out</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<div class="space-x-2 lg:block">
					<Button variant="secondary" href="/auth/login">Login</Button>
					<Button href="/auth/register">Register</Button>
				</div>
			{/if}
			<NavbarMobile />
		</div>
	</div>
</nav>

<AlertDialog.Root open={isOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Only logged in users can see this</AlertDialog.Title>
			<AlertDialog.Description>
				Please login or register to access this page
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={() => (isOpen = false)}>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={() => goto('/auth/login')}>Login</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

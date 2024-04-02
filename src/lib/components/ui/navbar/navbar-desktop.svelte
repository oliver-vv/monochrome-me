<script lang="ts">
	import { Button } from '../button';
	import * as Popover from '../popover';
	import NavbarMobile from './navbar-mobile.svelte';
	import * as Avatar from '$lib/components/ui/avatar';

	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { tweened } from 'svelte/motion';
	import * as Form from '$lib/components/ui/form';
	import { cubicOut } from 'svelte/easing';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { goto } from '$app/navigation';
	import { is } from 'date-fns/locale';

	import * as Card from '$lib/components/ui/card/index.js';

	export let session: Session | null;
	// export let supabase: SupabaseClient;

	let expanded = false;

	// console.log('user: ', session?.user);
	// console.log('email: ', session?.user.email);

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

	async function signOut() {
		const req = await fetch('/auth/logout', { method: 'POST' });
		if (req.ok) {
			goto('/');
		}
		// Optionally, handle client-side state changes or redirections after sign-out
	}

	let dashboardOpen = false;
	let profileOpen = false;
</script>

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
					<Popover.Root>
						<Popover.Trigger>
							<Button variant="ghost" on:click={toggleDropdown}
								><p class="mr-2">Dashboard</p>
								<div
									class=" inline-flex justify-center items-center"
									style="transform: rotate({$rotation}deg)"
								>
									<svg
										class=" origin-center"
										width="15"
										height="15"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										><path
											d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
											fill="currentColor"
											fill-rule="evenodd"
											clip-rule="evenodd"
										></path>
									</svg>
								</div>
							</Button>
						</Popover.Trigger>
						<Popover.Content class="grid gap-2 p-4 mt-4">
							<a
								class="flex-1 space-y-1 hover:bg-gray-100 rounded-lg p-3"
								href={session ? '/sessions' : ''}
								on:click={checkLogin}
							>
								<p class="text-sm font-medium leading-none">My sessions</p>
								<p class="text-sm text-muted-foreground">Manage your sessions</p>
							</a>
							<a
								class="flex-1 space-y-1 hover:bg-gray-100 rounded-lg p-3"
								href={session ? '/sessions' : ''}
								on:click={checkLogin}
							>
								<p class="text-sm font-medium leading-none">Downloads</p>
								<p class="text-sm text-muted-foreground">Manage your sessions</p>
							</a>
						</Popover.Content>
					</Popover.Root>
					<Button variant="ghost" href="/about-us">About Us</Button>
					<Button variant="ghost" href="/faq">FAQ</Button>
				</div>
			</div>
			{#if session}
				<div class="hidden lg:ml-6 lg:flex lg:items-center">
					<!-- Profile dropdown -->
					<div class="relative ml-3">
						<Popover.Root onOpenChange={() => !open}>
							<Popover.Trigger>
								<!-- focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 -->
								<Avatar.Root>
									<!-- <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" /> -->
									<Avatar.Fallback
										>{session?.user?.email?.slice(0, 1).toUpperCase()}</Avatar.Fallback
									>
								</Avatar.Root>
							</Popover.Trigger>
							<Popover.Content class="w-48">
								<!-- Active: "bg-gray-100", Not Active: "" -->
								<Button class="w-full justify-start text-gray-800" variant="ghost" href="/profile"
									>Your Profile</Button
								>

								<Button
									class="w-full justify-start text-gray-800"
									variant="ghost"
									href="/profile/settings">Settings</Button
								>

								<Button
									class="w-full justify-start text-gray-800"
									variant="ghost"
									on:click={signOut}>Sign Out</Button
								>
							</Popover.Content>
						</Popover.Root>
					</div>
				</div>
			{:else}
				<div class="space-x-2 hidden lg:block">
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

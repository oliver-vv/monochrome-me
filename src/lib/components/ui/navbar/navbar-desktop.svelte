<script lang="ts">
	import { Button } from '../button';
	import * as Popover from '../popover';
	import NavbarMobile from './navbar-mobile.svelte';
</script>

<nav class="border-b border-gray-200 bg-white">
	<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
		<div class="flex h-16 justify-between items-center">
			<div class="flex items-center">
				<div class="flex flex-shrink-0">
					<a href="/">
						<!-- mine -->
						<img class="p-2 block h-16 w-auto lg:hidden" src="/logo.png" alt="Monochrome Me" />
					</a>
					<a href="/">
						<!-- mine -->
						<img class=" p-2 hidden h-16 w-auto lg:block" src="/logo.png" alt="Monochrome Me" />
					</a>
				</div>
				<div class="hidden md:-my-px md:ml-6 md:flex md:space-x-8">
					<!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
					<Button variant="ghost" href="booking">Book now</Button>
					<Popover.Root>
						<Popover.Trigger>
							<Button variant="ghost">Dashboard</Button>
						</Popover.Trigger>
						<Popover.Content class="grid gap-2 p-4 mt-4">
							<a class="flex-1 space-y-1 hover:bg-gray-100 rounded-lg p-3" href="booking">
								<p class="text-sm font-medium leading-none">My sessions</p>
								<p class="text-sm text-muted-foreground">Manage your sessions</p>
							</a>
							<a class="flex-1 space-y-1 hover:bg-gray-100 rounded-lg p-3" href="booking">
								<p class="text-sm font-medium leading-none">Download</p>
								<p class="text-sm text-muted-foreground">Download your favourite pictures</p>
							</a>
						</Popover.Content>
					</Popover.Root>
					<Button variant="ghost" href="about-us">About us</Button>
					<Button variant="ghost" href="faq">FAQ</Button>
				</div>
			</div>
			<div class="hidden md:ml-6 md:flex md:items-center">
				<!-- Profile dropdown -->
				<div class="relative ml-3">
					<Popover.Root>
						<Popover.Trigger>
							<!-- focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 -->
							<img
								class="h-8 w-8 rounded-full"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""
							/>
						</Popover.Trigger>
						<Popover.Content class="w-48">
							<!-- Active: "bg-gray-100", Not Active: "" -->
							<a
								href="/"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-0">Your Profile</a
							>
							<a
								href="/"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-1">Settings</a
							>
							<a
								href="/"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-2">Sign out</a
							>
						</Popover.Content>
					</Popover.Root>
				</div>
			</div>
			<NavbarMobile />
		</div>
	</div>
</nav>

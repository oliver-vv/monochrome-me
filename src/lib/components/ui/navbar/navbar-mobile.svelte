<script lang="ts">
	import Button from '../button/button.svelte';
	import * as Sheet from '../sheet';
	import * as Card from '../card';
	import * as Drawer from '$lib/components/ui/drawer';
	import { page } from '$app/stores';
	import Separator from '../separator/separator.svelte';

	let showMobileMenu = false;

	const isCurrentPage = (href: string) => {
		// Adjust your logic here to properly match your application's routing structure
		// For simplicity, this example assumes the href exactly matches the pathname
		return href === $page.url.pathname;
	};
</script>

<div class="lg:hidden" id="mobile-menu">
	<Sheet.Root>
		<Sheet.Trigger class="-mr-2 flex items-center">
			<div class="rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
				<svg
					class=" h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</div>
		</Sheet.Trigger>
		<Sheet.Content side="left" class="w-56 md:w-64 pt-14">
			<Sheet.Header>
				<Sheet.Title></Sheet.Title>
				<Sheet.Description></Sheet.Description>
			</Sheet.Header>

			<Sheet.Close>
				<div class="grid gap-4 w-44 md:w-52">
					<Button
						class="w-full justify-start"
						variant={isCurrentPage('/booking') ? 'default' : 'secondary'}
						href="booking"
					>
						Book now
					</Button>
					<Button
						class="w-full justify-start"
						variant={isCurrentPage('/my-sessions') ? 'default' : 'secondary'}
						href="sessions">My sessions</Button
					>
					<Button
						class="w-full justify-start"
						variant={isCurrentPage('/downloads') ? 'default' : 'secondary'}
						href="downloads">Downloads</Button
					>
					<Separator />

					<Button
						class="w-full justify-start "
						variant={isCurrentPage('/about-us') ? 'default' : 'secondary'}
						href="about-us"
					>
						About us
					</Button>
					<Button
						class="w-full justify-start"
						variant={isCurrentPage('/faq') ? 'default' : 'secondary'}
						href="faq">FAQ</Button
					>
				</div>
			</Sheet.Close>
		</Sheet.Content>
	</Sheet.Root>
</div>

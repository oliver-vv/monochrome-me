<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	import type { PageData } from './$types';
	import ContactForm from './contact-form.svelte';
	export let data: PageData;
</script>

<!-- https://v0.dev/t/JGZ8PB5yjvR -->

<div class="flex flex-col bg-white dark:bg-gray-900">
	<main>
		<section>
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 class="text-base text-primary font-semibold tracking-wide uppercase">About Us</h2>
				<p class="mt-2 text-3xl leading-8 tracking-tight text-gray-900 dark:text-gray-100">
					Lorem ipsum dolor sit amet
				</p>
				<p class="mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400 text-left">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Orci porta non pulvinar neque. Felis donec et odio
					pellentesque diam. Elit duis tristique sollicitudin nibh. Ac feugiat sed lectus
					vestibulum.
				</p>

				<div class="mt-10">
					<!-- <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"></div> -->
					<div class="grid gap-5 md:grid-cols-2">
						<Card.Root>
							<Card.Header>
								<Card.Title>Lorem ipsum dolor sit amet</Card.Title>
								<Card.Description
									>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Vitae auctor eu augue ut. Tincidunt
									id aliquet risus feugiat in ante metus dictum at.
								</Card.Description>
							</Card.Header>
						</Card.Root>
						<Card.Root>
							<Card.Header>
								<Card.Title>Lorem ipsum dolor sit amet</Card.Title>
								<Card.Description
									>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Sem et tortor consequat id porta nibh
									venenatis cras sed. Morbi tincidunt ornare massa eget egestas purus.</Card.Description
								>
							</Card.Header>
						</Card.Root>
						<Card.Root>
							<Card.Header>
								<Card.Title>Lorem ipsum dolor sit amet</Card.Title>
								<Card.Description
									>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec
									feugiat in fermentum. Malesuada proin libero nunc consequat interdum varius.</Card.Description
								>
							</Card.Header>
						</Card.Root>
					</div>
				</div>
			</div>
		</section>
		<section>
			<div class="bg-white py-20">
				<div class="mx-auto max-w-7xl px-6 lg:px-8">
					<div class="mx-auto max-w-2xl lg:mx-0">
						<h2 class="text-3xl leading-8 tracking-tight text-gray-900">Our offices</h2>
						<p class="mt-6 text-lg leading-8 text-gray-600">
							Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non.
							Cras aliquet purus dui laoreet diam sed lacus, fames.
						</p>
					</div>
					<div
						class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4"
					>
						<div>
							<h3 class="border-l border-primary pl-6 font-semibold text-gray-900">Berlin</h3>
							<address class="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
								<p>Am Tempelhofer Berg 6</p>
								<p>10965 Berlin, Germany</p>
							</address>
						</div>
						<div>
							<h3 class="border-l border-primary pl-6 font-semibold text-gray-900">New York</h3>
							<address class="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
								<p>886 Walter Street</p>
								<p>New York, NY 12345</p>
							</address>
						</div>
						<div>
							<h3 class="border-l border-primary pl-6 font-semibold text-gray-900">Toronto</h3>
							<address class="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
								<p>7363 Cynthia Pass</p>
								<p>Toronto, ON N3Y 4H8</p>
							</address>
						</div>
						<div>
							<h3 class="border-l border-primary pl-6 font-semibold text-gray-900">London</h3>
							<address class="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
								<p>114 Cobble Lane</p>
								<p>London N1 2EF</p>
							</address>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section>
			<ContactForm data={data.form} />
		</section>
	</main>
</div>

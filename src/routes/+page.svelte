<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Autoscroll from 'embla-carousel-auto-scroll';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	import * as Card from '$lib/components/ui/card/index.js';

	export let data: any;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(async () => {
		const { data, error } = await supabase.auth.getSession();
		console.log('data:', data.session);
		session = data.session;
	});
	console.log('session:', session);
</script>

<main>
	<div class="grid max-w-6xl gap-40">
		<section>
			<!-- h-[408px] w-[750px] -->
			<div class="mt-40 inline-flex flex-col items-start justify-center gap-12">
				<div class="flex flex-col items-start justify-start gap-6">
					<div class="flex flex-col items-start justify-start">
						<h1 class="font-h-1 text-[89.76px] font-light">Monochrome</h1>
						<h1 class="font-h-1 text-[89.76px] font-bold text-slate-800">Me</h1>
					</div>
					<!-- h-[70px] w-[750px] -->
					<div class="text-[28.43px] font-semibold text-slate-600">
						Welcome to Monochrome Me <br /> - your private studio for high-quality self portraiture
					</div>
				</div>
				<div class="inline-flex items-center justify-center gap-8">
					<Button href="/booking">Book Now</Button>
					<Button variant="secondary">Learn More</Button>
				</div>
			</div>
		</section>

		<section>
			<Carousel.Root
				orientation="horizontal"
				opts={{
					align: 'center',
					loop: true,
					dragFree: true
				}}
			>
				<Carousel.Content class="w-full">
					<Carousel.Item class="basis-1/4 ">
						<img src="blackImg-1.jpg" alt="test img" class="rounded-lg shadow-md" width="250" />
					</Carousel.Item>
					<Carousel.Item class="basis-1/4 ">
						<img src="whiteImg-1.jpg" alt="test img" class="rounded-lg shadow-md" width="250" />
					</Carousel.Item>
					<Carousel.Item class="basis-1/4 ">
						<img src="blackImg-1.jpg" alt="test img" class="rounded-lg shadow-md" width="250" />
					</Carousel.Item>
					<Carousel.Item class="basis-1/4 ">
						<img src="whiteImg-1.jpg" alt="test img" class="rounded-lg shadow-md" width="250" />
					</Carousel.Item>
					<Carousel.Item class="basis-1/4 ">
						<img src="blackImg-1.jpg" alt="test img" class="rounded-lg shadow-md" width="250" />
					</Carousel.Item>
					<Carousel.Item class="basis-1/4 ">
						<img src="whiteImg-1.jpg" alt="test img" class="rounded-lg shadow-md" width="250" />
					</Carousel.Item>
				</Carousel.Content>
			</Carousel.Root>
		</section>

		<section>
			<div class="flex flex-col items-center justify-center gap-24 md:max-w-2xl lg:max-w-6xl">
				<div class="justify-centergap-6 flex flex-col items-center">
					<div class="self-stretch text-center text-[50.52px] font-semibold">
						What makes this so special?
					</div>
					<div class="h-[136px] w-[949px] text-center text-[28.43px] font-semibold text-slate-600">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Mi quis hendrerit dolor magna. Potenti
						nullam ac tortor vitae purus. Volutpat blandit aliquam etiam erat velit scelerisque in
						dictum non.
					</div>
				</div>

				<div class="grid gap-6 md:grid-cols-3 md:grid-rows-2">
					<div class=" h-52 w-52 md:col-span-1 md:row-span-1 md:h-64 md:w-64 lg:h-80 lg:w-80">
						<Card.Root class="h-full w-full bg-neutral-200 shadow-lg">
							<Card.Header>
								<Card.Title>Card Title #1</Card.Title>
								<Card.Description>Card Description</Card.Description>
							</Card.Header>
							<Card.Content>
								<p>Card Content</p>
							</Card.Content>
						</Card.Root>
					</div>
					<div class=" h-52 w-52 md:col-span-1 md:row-span-1 md:h-64 md:w-64 lg:h-80 lg:w-80">
						<Card.Root class="h-full w-full  bg-neutral-200 shadow-lg">
							<img src="box1.webp" class=" rounded-xl" alt="" />
						</Card.Root>
					</div>
					<div class="h-80 w-80 md:col-span-1 md:row-span-2 md:h-full">
						<Card.Root class="h-full w-full bg-neutral-200 shadow-lg">
							<Card.Header>
								<Card.Title>Card Title #3</Card.Title>
								<Card.Description>Card Description</Card.Description>
							</Card.Header>
							<Card.Content>
								<p>Card Content</p>
							</Card.Content>
						</Card.Root>
					</div>
					<div class="h-80 w-80 md:col-span-2 md:row-span-1 md:h-full md:w-full">
						<Card.Root class="h-full w-full bg-neutral-200 shadow-lg">
							<img src="box2.webp" class=" h-80 w-[41.5rem] rounded-xl object-cover" alt="" />
						</Card.Root>
					</div>
				</div>
			</div>
		</section>
	</div>
</main>

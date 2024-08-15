<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Autoscroll from 'embla-carousel-auto-scroll';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { Badge } from '$lib/components/ui/badge';
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
	<!-- <section class="h-screen">
		<div class="mx-auto mt-60 flex w-[1120px] flex-grow flex-col items-start justify-center gap-12">
			<div class="flex flex-col items-start justify-start gap-6">
				<div class="flex flex-col items-start justify-start">
					<h1 class="font-h-1 text-[89.76px] font-light">Monochrome</h1>
					<h1 class="font-h-1 text-[89.76px] font-bold text-slate-800">Me</h1>
				</div>

				<div class="text-[28.43px] font-semibold text-slate-600">
					Welcome to Monochrome Me <br /> - your private studio for high-quality self portraiture
				</div>
			</div>
			<div class="flex items-center justify-center gap-8">
				<Button href="/booking">Book Now</Button>
				<Button variant="secondary">Learn More</Button>
			</div>
		</div>

		<div class="-mb-[20%] h-52 w-full">
			<Carousel.Root
				orientation="horizontal"
				opts={{
					align: 'center',
					loop: true,
					dragFree: true
				}}
			>
				<Carousel.Content class="-ml-10">
					<Carousel.Item class="basis-1/4 pl-4">
						<img src="blackImg-1.jpg" alt="test img" class="rounded-lg shadow-md" width="400" />
					</Carousel.Item>
					<Carousel.Item class="basis-1/4 pl-4">
						<img src="whiteImg-1.jpg" alt="test img" class="rounded-lg shadow-md" width="400" />
					</Carousel.Item>
					<Carousel.Item class="basis-1/4 pl-4">
						<img src="blackImg-1.jpg" alt="test img" class="rounded-lg shadow-md" width="400" />
					</Carousel.Item>
					<Carousel.Item class="basis-1/4 pl-4">
						<img src="whiteImg-1.jpg" alt="test img" class="rounded-lg shadow-md" width="400" />
					</Carousel.Item>
					<Carousel.Item class="basis-1/4 pl-4">
						<img src="blackImg-1.jpg" alt="test img" class="rounded-lg shadow-md" width="400" />
					</Carousel.Item>
					<Carousel.Item class="basis-1/4 pl-4">
						<img src="whiteImg-1.jpg" alt="test img" class="rounded-lg shadow-md" width="400" />
					</Carousel.Item>
				</Carousel.Content>
			</Carousel.Root>
		</div>
	</section> -->

	<section class="relative flex h-screen flex-col">
		<div class="flex-grow">
			<div class="mx-auto flex w-[1120px] flex-col items-start gap-12 pt-24">
				<div class="flex flex-col items-start gap-6">
					<h1 class="text-[90px] font-light">Monochrome</h1>
					<h1 class="text-[90px] font-bold text-slate-800">Me</h1>
					<p class="text-[28px] font-semibold text-slate-600">
						Welcome to Monochrome Me<br />- your private studio for high-quality self portraiture
					</p>
				</div>
				<div class="flex gap-8">
					<Button href="/booking">Book Now</Button>
					<Button variant="secondary">Learn More</Button>
				</div>
			</div>
		</div>
		<div class="h-24 w-full overflow-hidden">
			<!-- Smaller visible part of the Carousel -->
			<div class="absolute bottom-0 left-0 h-full w-full">
				<Carousel.Root orientation="horizontal" class="h-full w-full">
					<Carousel.Content class="-ml-10 flex">
						<Carousel.Item class="basis-1/4 pl-4">
							<img
								src="blackImg-1.jpg"
								alt="Black themed studio"
								class="rounded-lg shadow-md"
								width="400"
								height="240"
							/>
						</Carousel.Item>
						<Carousel.Item class="basis-1/4 pl-4">
							<img
								src="whiteImg-1.jpg"
								alt="White themed studio"
								class="rounded-lg shadow-md"
								width="400"
								height="240"
							/>
						</Carousel.Item>
						<Carousel.Item class="basis-1/4 pl-4">
							<img
								src="blackImg-1.jpg"
								alt="Black themed studio"
								class="rounded-lg shadow-md"
								width="400"
								height="240"
							/>
						</Carousel.Item>
						<Carousel.Item class="basis-1/4 pl-4">
							<img
								src="whiteImg-1.jpg"
								alt="White themed studio"
								class="rounded-lg shadow-md"
								width="400"
								height="240"
							/>
						</Carousel.Item>
						<!-- Additional Carousel Items -->
					</Carousel.Content>
				</Carousel.Root>
			</div>
		</div>
	</section>

	<section>
		<div class="mx-auto flex h-[494px] w-[1120px] flex-col items-start justify-start gap-8">
			<Badge variant="secondary" class=" px-4 py-2 text-sm">About Us</Badge>

			<div class="inline-flex items-start justify-start gap-32">
				<div class="w-64 font-['Inter'] text-[37.90px] font-semibold text-black">Who we are</div>
				<div class="inline-flex w-[736px] flex-col items-start justify-start gap-8">
					<div class="flex h-[122px] flex-col items-start justify-start gap-4 self-stretch">
						<div class="self-stretch font-['Inter'] text-[21.33px] font-normal text-black">
							Our Philosophy
						</div>
						<div
							class="self-stretch font-['Inter'] text-base font-normal leading-tight text-slate-600"
						>
							In today's world, self-representation plays a significant role in our digital and
							social identities. Yet, capturing the true self can sometimes be challenging,
							especially under the watchful eye of a photographer. At Monochrome Me, we eliminate
							this barrier by providing a private, comfortable environment where you can freely
							express yourself without any pressure or judgment.
						</div>
					</div>
					<div class="flex h-[102px] flex-col items-start justify-start gap-4 self-stretch">
						<div class="self-stretch font-['Inter'] text-[21.33px] font-normal text-black">
							Your Space, Your Rules
						</div>
						<div
							class="self-stretch font-['Inter'] text-base font-normal leading-tight text-slate-600"
						>
							Our studio is stripped down to the essentials: a mirror, a light, and a remote
							control. This simplicity encourages experimentation and self-discovery. Dance, laugh,
							ponder, or play — the studio is your canvas. We provide the tools; you create the
							masterpiece.
						</div>
					</div>
					<div class="flex h-[136px] flex-col items-start justify-start gap-4 self-stretch">
						<div class="self-stretch font-['Inter'] text-[21.33px] font-normal text-black">
							Looking Ahead
						</div>
						<div
							class="self-stretch font-['Inter'] text-base font-normal leading-tight text-slate-600"
						>
							As we embark on this exciting journey, our vision extends beyond Berlin. We plan to
							bring Monochrome Me to other cities, spreading the joy of self-captured photography
							far and wide. Stay tuned for future studios, each designed with the same commitment to
							quality, privacy, and artistic freedom.<br />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- <section>
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
		</section> -->
</main>

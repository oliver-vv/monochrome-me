<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Autoscroll from 'embla-carousel-auto-scroll';
	import { toast } from 'svelte-sonner';
</script>

<main>
	<div class="relative bg-white">
		<div class="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
			<div class="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
				<div class="mx-auto max-w-2xl lg:mx-0">
					<div class="hidden sm:mt-32 sm:flex lg:mt-16">
						<div
							class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
						>
							Anim aute id magna aliqua ad ad non deserunt sunt. <a
								href="/"
								class="whitespace-nowrap font-semibold text-indigo-600"
								><span class="absolute inset-0" aria-hidden="true"></span>Read more
								<span aria-hidden="true">&rarr;</span></a
							>
						</div>
					</div>
					<h1 class="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
						Data to enrich your online business
					</h1>
					<p class="mt-6 text-lg leading-8 text-gray-600">
						Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
						commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
					</p>
					<div class="mt-10 flex items-center gap-x-6">
						‚
						<a
							href="/"
							class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>Get started</a
						>
						<a href="/" class="text-sm font-semibold leading-6 text-gray-900"
							>Learn more <span aria-hidden="true">→</span></a
						>
					</div>
				</div>
			</div>
			<div class="relative lg:col-span-5 ml-40">
				<!-- <img
					class="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
					src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
					alt=""
				/> -->
				<Carousel.Root
					orientation="vertical"
					opts={{
						align: 'center',
						loop: true,
						dragFree: true
					}}
					plugins={[
						Autoscroll({
							startDelay: 1000,
							speed: 2,
							stopOnInteraction: false,
							stopOnFocusIn: false
						})
					]}
				>
					<Carousel.Content class="h-screen">
						<Carousel.Item class=" basis-1/3">
							<img src="blackImg-1.jpg" alt="test img" class="shadow-md rounded-lg" width="250" />
						</Carousel.Item>
						<Carousel.Item class="basis-1/3">
							<img src="whiteImg-1.jpg" alt="test img" class="shadow-md rounded-lg" width="250" />
						</Carousel.Item>
						<Carousel.Item class="basis-1/3">
							<img src="blackImg-1.jpg" alt="test img" class="shadow-md rounded-lg" width="250" />
						</Carousel.Item>
						<Carousel.Item class="basis-1/3">
							<img src="whiteImg-1.jpg" alt="test img" class="shadow-md rounded-lg" width="250" />
						</Carousel.Item>
					</Carousel.Content>
				</Carousel.Root>
			</div>
		</div>
	</div>

	<div class="flex flex-col w-[750px] h-[408px] items-start justify-center gap-[50px] relative">
		<div class="flex flex-col w-[750px] items-start gap-[24px] relative flex-[0_0_auto]">
			<h1
				class="relative w-[750px] h-[221px] mt-[-1.00px] font-[number:var(--h-1-font-weight)] text-[#000000] tracking-[var(--h-1-letter-spacing)] leading-[var(--h-1-line-height)] [font-style:var(--h-1-font-style)]"
			>
				Monochrome <br />
				Me
			</h1>
			<p
				class="relative w-[750px] h-[70px] font-large font-[number:var(--large-font-weight)] text-slate-600 text-[length:var(--large-font-size)] tracking-[var(--large-letter-spacing)] leading-[var(--large-line-height)] [font-style:var(--large-font-style)]"
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
			</p>
		</div>
		<div class="inline-flex items-center justify-center gap-[20px] relative flex-[0_0_auto]">
			<Button class="flex bg-red-700 w-[90px]">Book Now</Button>
			<Button class="flex w-[90px]">Learn More</Button>
			<!-- divclass="!mr-[-9.00px] !ml-[-9.00px]" -->
		</div>
	</div>
</main>

<Button
	on:click={() => {
		toast('ITS WORKLING');
	}}>Test sonner</Button
>

<!-- <Carousel.Root
					class="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
				>
					<Carousel.Content>
						<Carousel.Item><img src="https://picsum.photos/600/800" alt="" /></Carousel.Item>
						<Carousel.Item><img src="https://picsum.photos/600/800" alt="" /></Carousel.Item>
					</Carousel.Content>
					<Carousel.Previous />
					<Carousel.Next />
				</Carousel.Root> -->

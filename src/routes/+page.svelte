<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
</script>

<main>
	<section class="w-full py-12 md:py-24 lg:py-32">
		<div class="container px-4 md:px-6">
			<div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
				<div class="flex flex-col justify-center space-y-4">
					<div class="space-y-2">
						<h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
							Welcome to Our Platform
						</h1>
						<p class="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
							Explore the world of innovation and technology with us. Dive into the endless
							possibilities and transform your business.
						</p>
					</div>
					<div class="flex flex-col gap-2 min-[400px]:flex-row">
						<Button href="/">Get Started</Button>

						<!-- class="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300" -->

						<Button variant="secondary" href="/">Learn More</Button>
					</div>
				</div>
				<Carousel.Root
					class="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
				>
					<Carousel.Content>
						<Carousel.Item><img src="https://picsum.photos/600/800" alt="" /></Carousel.Item>

						<Carousel.Item></Carousel.Item>
					</Carousel.Content>
					<Carousel.Previous />
					<Carousel.Next />
				</Carousel.Root>
			</div>
		</div>
	</section>
</main>

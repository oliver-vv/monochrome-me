<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import * as Select from '$lib/components/ui/select';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

	export let data;

	$: console.log('Images on client:', data.images);

	// onMount(async () => {
	// 	const res = await fetch('https://picsum.photos/v2/list');
	// 	images = await res.json();
	// 	console.log(images);
	// });
</script>

<Card.Root class="mx-auto max-w-5xl">
	<Card.Header>
		<div class="flex justify-between items-center">
			<Card.Title>Photo Gallery</Card.Title>
			<Select.Root>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Sort by" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="newest">Newest</Select.Item>
					<Select.Item value="oldest">Oldest</Select.Item>
					<Select.Item value="popular">Most Popular</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
		<Card.Description
			>Select your favorite photos and download them in high resolution.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			{#each data.images as image}
				<img
					src={image.download_url}
					alt="Placeholder"
					width="200"
					height="200"
					class="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
				/>
			{/each}

			<!-- <div class="relative">
				<Checkbox class="absolute top-2 right-2" id="select-1" />
				<img
					alt="Photo 1"
					class="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
					height="200"
					src=""
					width="200"
				/>
			</div>
			<div class="relative">
				<Checkbox class="absolute top-2 right-2" id="select-2" />
				<img
					alt="Photo 2"
					class="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
					height="200"
					src="/placeholder.svg"
					width="200"
				/>
			</div>
			<div class="relative">
				<Checkbox class="absolute top-2 right-2" id="select-3" />
				<img
					alt="Photo 3"
					class="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
					height="200"
					src="/placeholder.svg"
					width="200"
				/>
			</div>
			<div class="relative">
				<Checkbox class="absolute top-2 right-2" id="select-4" />
				<img
					alt="Photo 4"
					class="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
					height="200"
					src="/placeholder.svg"
					width="200"
				/>
			</div>
			<div class="relative">
				<Checkbox class="absolute top-2 right-2" id="select-5" />
				<img
					alt="Photo 5"
					class="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
					height="200"
					src="/placeholder.svg"
					width="200"
				/>
			</div>
			<div class="relative">
				<Checkbox class="absolute top-2 right-2" id="select-6" />
				<img
					alt="Photo 6"
					class="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
					height="200"
					src="/placeholder.svg"
					width="200"
				/>
			</div>
			<div class="relative">
				<Checkbox class="absolute top-2 right-2" id="select-7" />
				<img
					alt="Photo 7"
					class="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
					height="200"
					src="/placeholder.svg"
					width="200"
				/>
			</div>
			<div class="relative">
				<Checkbox class="absolute top-2 right-2" id="select-8" />
				<img
					alt="Photo 8"
					class="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
					height="200"
					src="/placeholder.svg"
					width="200"
				/>
			</div> -->
		</div>
	</Card.Content>
	<Card.Footer>
		<span class="mr-2 text-gray-500 text-lg">Selected: 0</span>
		<Button class="w-1/2 ml-auto bg-red-500">
			<div class="mr-2 h-4 w-4">
				<!-- <svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<polyline points="7 10 12 15 17 10" />
					<line x1="12" x2="12" y1="15" y2="3" />
				</svg> -->
			</div>
			Download Selected
		</Button>
	</Card.Footer>
</Card.Root>

<!-- function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
} -->

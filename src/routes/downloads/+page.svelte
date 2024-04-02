<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import * as Select from '$lib/components/ui/select';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

	import JSZip from 'jszip';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	interface SignedUrlData {
		error: null | string;
		path: string;
		signedURL: string;
		signedUrl: string;
	}

	interface ImageData {
		url: string;
		path: string;
	}

	let imageData: ImageData[] = [];

	let selectedImages: string[] = [];

	onMount(async () => {
		const response = await fetch(`/api/get-session-images`);
		if (!response.ok) {
			throw new Error('Failed to get session images');
		}

		const { signedUrlsData } = await response.json();

		console.log('Done fetching images: ', signedUrlsData);
		imageData = signedUrlsData.map((item: SignedUrlData) => {
			return { url: item.signedUrl, path: item.path };
		});
	});

	function addItem(id: string) {
		selectedImages = [...selectedImages, id];
	}

	function removeItem(id: string) {
		selectedImages = selectedImages.filter((i) => i !== id);
	}

	let selectAll = false;
	$: selectAll, handleSelectAll(selectAll);

	function handleSelectAll(selectAll: boolean) {
		if (selectAll) {
			selectedImages = imageData.map((data) => data.path);
		} else {
			selectedImages = [];
		}
	}

	function toggleSelectAll() {
		selectAll = !selectAll;
	}

	$: console.log('selectedImages: ', selectedImages);

	async function download() {
		let current = selectedImages;
		if (current.length === 0) {
			alert('Please select images to download');
			return;
		}
		// const data = selectedImages;
		let response = await fetch('/api/download-images', {
			method: 'POST',
			body: JSON.stringify(current)
		});

		// const response = await fetch(`/api/get-session-images`);
		if (!response.ok) {
			throw new Error('Failed to get images');
		}

		const { signedUrlsData } = await response.json();

		console.log('Done fetching images: ', signedUrlsData);

		const imageData = signedUrlsData.map((item: SignedUrlData) => {
			return { url: item.signedUrl, path: item.path };
		});

		const zip = new JSZip();

		for (const img of imageData) {
			let imgBlob = await fetch(img.url).then((res) => res.blob());

			zip.file(img.path, imgBlob);

			console.log('Added: ', img.path);
		}

		console.log('DOWNLOAD COMPLETE');
		let gen = await zip.generateAsync({ type: 'blob' });

		var url = window.URL || window.webkitURL;
		let link = url.createObjectURL(gen);

		// generate anchor tag, click it for download and then remove it again
		let a = document.createElement('a');

		a.setAttribute('download', `Monochrome Me.zip`);
		a.setAttribute('href', link);

		document.body.appendChild(a);

		a.click();

		document.body.removeChild(a);
	}
</script>

<Card.Root class="mx-auto max-w-5xl">
	<Card.Header>
		<div class="flex justify-between items-center">
			<Card.Title>Your Photos</Card.Title>
			<Select.Root>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Sort by" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="newest">Newest</Select.Item>
					<Select.Item value="oldest">Oldest</Select.Item>
					<Select.Item value="favourite">Selected</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
		<Card.Description
			>For security reasons the photos are availiable for 10 minutes. <br /> After the time has passed
			the page will be refreshed and the selection reset.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			{#each imageData as data, index}
				<div class="relative">
					<Checkbox
						class="absolute top-2 right-2"
						id="select-{index}"
						checked={selectedImages.includes(data.path)}
						onCheckedChange={(v) => {
							if (v) {
								addItem(data.path);
							} else {
								removeItem(data.path);
							}
						}}
					/>
					<img
						loading="lazy"
						src={data.url}
						alt={`Image ${index}`}
						width="200"
						class="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
					/>
				</div>
			{/each}
		</div>
	</Card.Content>
	<Card.Footer>
		<div class="flex justify-between w-full">
			<span class="mr-2 text-gray-500 text-lg">Selected: {selectedImages.length}</span>
			<div>
				<Button variant="secondary" on:click={toggleSelectAll}
					>{selectAll ? 'Deselect All' : 'Select All'}</Button
				>
				<Button on:click={download}>Download Selected</Button>
			</div>
		</div>
	</Card.Footer>
</Card.Root>

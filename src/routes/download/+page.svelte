<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { BlobWriter, ZipWriter, BlobReader } from '@zip.js/zip.js';

	import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

	// Get token from URL
	const urlToken = $page.url.searchParams.get('token');

	interface SignedUrlData {
		signedUrl: string;
		thumbnailUrl: string;
		fullSizePath: string;
		path: string;
		error: null | string;
	}

	interface ImageData {
		url: string;
		path: string;
	}

	export let data: {
		images: SignedUrlData[];
		appointmentId: string;
		clientName: string;
	};

	let { images, appointmentId, clientName } = data;

	let selectedImages: string[] = [];

	let imageData: ImageData[] = images
		.filter((item) => item.thumbnailUrl && item.fullSizePath)
		.map((item) => ({
			url: item.thumbnailUrl,
			path: item.fullSizePath
		}));

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

	let isDownloading = false;

	interface SignedUrlDownloadData {
		signedUrl: string;
		path: string;
	}

	interface DownloadResponse {
		urls: SignedUrlDownloadData[];
		filename: string;
	}

	async function download() {
		if (selectedImages.length === 0) {
			alert('Please select images to download');
			return;
		}

		isDownloading = true;
		try {
			// Create a ReadableStream to pipe the data
			const stream = new ReadableStream({
				async start(controller) {
					try {
						const response = await fetch(`${PUBLIC_SUPABASE_URL}/functions/v1/download-images`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${PUBLIC_SUPABASE_ANON_KEY}`
							},
							body: JSON.stringify({
								token: urlToken,
								paths: selectedImages
							})
						});

						if (!response.ok) {
							throw new Error('Failed to prepare download');
						}

						const { urls, filename } = (await response.json()) as DownloadResponse;

						// Create zip writer that writes to the stream
						const zipWriter = new ZipWriter(new BlobWriter('application/zip'));

						// Process files
						for (const urlData of urls) {
							const response = await fetch(urlData.signedUrl);
							const blob = await response.blob();
							const filename = urlData.path.split('/').pop() || urlData.path;
							await zipWriter.add(filename, new BlobReader(blob));
						}

						const zipBlob = await zipWriter.close();
						const chunks = await zipBlob.arrayBuffer();
						controller.enqueue(new Uint8Array(chunks));
						controller.close();
					} catch (error) {
						controller.error(error);
					}
				}
			});

			// Create download link from stream
			const response = new Response(stream);
			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `photos.zip`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error: unknown) {
			console.error('Download error:', error);
			const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
			alert(`Failed to download images: ${errorMessage}`);
		} finally {
			isDownloading = false;
		}
	}
</script>

<Card.Root class="mx-auto max-w-5xl">
	<Card.Header>
		<div class="flex items-center justify-between">
			<Card.Title>Hi, {clientName}! Your Photos are ready!</Card.Title>
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
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
			{#each imageData as data, index}
				<div class="relative">
					<Checkbox
						class="absolute right-2 top-2"
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
						class="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
					/>
				</div>
			{/each}
		</div>
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full justify-between">
			<span class="mr-2 text-lg text-gray-500">Selected: {selectedImages.length}</span>
			<div>
				<Button variant="secondary" on:click={toggleSelectAll}
					>{selectAll ? 'Deselect All' : 'Select All'}</Button
				>
				<Button on:click={download} disabled={isDownloading}>
					{#if isDownloading}
						Preparing Download...
					{:else}
						Download Selected
					{/if}
				</Button>
			</div>
		</div>
	</Card.Footer>
</Card.Root>

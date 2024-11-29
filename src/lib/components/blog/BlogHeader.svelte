<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';

	export let title: string;
	export let publishDate: string;
	export let tags: string[];
</script>

<Card.Root class="mb-16 overflow-hidden shadow-xl">
	<Card.Header>
		<Card.Title class="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">{title}</Card.Title>
		<Card.Description>Published on {publishDate}</Card.Description>
	</Card.Header>

	<Card.Footer class="flex justify-start gap-4">
		{#each tags as tag}
			<Badge variant="outline" class="px-2 py-1 text-sm hover:bg-red-600 hover:text-white">
				{tag}
			</Badge>
		{/each}
	</Card.Footer>
</Card.Root>

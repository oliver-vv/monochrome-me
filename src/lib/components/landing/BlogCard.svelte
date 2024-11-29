<script lang="ts">
	// import { ArrowRight } from 'lucide-svelte';

	export let title: string;
	export let description: string;
	//export let image: string;
	export let href: string;
</script>

<a {href} class="mx-auto block w-full max-w-sm rounded-lg transition-colors hover:bg-accent">
	<article class="overflow-hidden">
		<div class="relative mb-4 aspect-video">
			<img
				src="https://via.placeholder.com/400x200"
				alt="Placeholder"
				class="h-full w-full rounded-lg object-cover"
			/>
		</div>
		<div class=" px-4 pb-4">
			<h2 class="mb-2 line-clamp-2 text-2xl font-bold">
				{title}
			</h2>
			<p class="mb-4 line-clamp-3 text-sm text-muted-foreground">
				{description}
			</p>
			<div class="flex items-center text-primary">
				Read More
				<!-- <ArrowRight class="ml-2 h-4 w-4" /> -->
			</div>
		</div>
	</article>
</a>

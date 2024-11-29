<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let activeSection: string;
	export let sections: string[];

	const dispatch = createEventDispatcher();

	function handleClick(id: string) {
		dispatch('click', id);
	}
</script>

<aside class="sticky top-8 hidden w-72 self-start lg:block">
	<nav class="space-y-2">
		{#each sections as id}
			<a
				href={`#${id}`}
				on:click|preventDefault={() => handleClick(id)}
				class={`block rounded-md px-4 py-3 text-lg transition-colors ${
					activeSection === id
						? 'bg-red-500 text-white'
						: 'hover:bg-gray-200 dark:hover:bg-gray-800'
				}`}
			>
				{id
					.split('-')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ')}
			</a>
		{/each}
	</nav>
</aside>

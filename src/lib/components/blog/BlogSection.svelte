<script lang="ts">
	export let id: string;
	export let title: string;
</script>

<div class="mb-16">
	<h2 {id} class="mb-8 scroll-mt-24 text-4xl font-bold">
		{title}
	</h2>
	<slot />
</div>

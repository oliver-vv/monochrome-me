<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import RegisterForm from './register-form.svelte';

	export let data: PageData;
</script>

<main class="flex-1 flex justify-center items-center">
	<RegisterForm data={data.form} />
</main>

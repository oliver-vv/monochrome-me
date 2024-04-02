<script lang="ts">
	import type { PageData } from './$types';
	import LoginForm from './login-form.svelte';

	export let data: PageData;
</script>

<main class="flex-1 flex justify-center items-center">
	<LoginForm data={data.form} />
</main>

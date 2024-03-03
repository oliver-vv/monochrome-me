<script lang="ts">
	import { page } from '$app/stores';
	import NavbarMobile from './navbar-mobile.svelte';
	import NavbarDesktop from './navbar-desktop.svelte';

	const isCurrentPage = (href: string) => {
		// Adjust your logic here to properly match your application's routing structure
		// For simplicity, this example assumes the href exactly matches the pathname
		return href === $page.url.pathname;
	};
</script>

<!--
  <html class="h-full">
  <body class="h-full">
-->

<NavbarDesktop />

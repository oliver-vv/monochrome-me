<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<!--
  This example requires updating your template:

  ```
  <html class="h-full">
  <body class="h-full">
  ```
-->
<main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
	<div class="text-center">
		<p class="text-base font-semibold text-primary">404</p>
		<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
		<p class="mt-6 text-base leading-7 text-gray-600">
			Sorry, we couldn’t find the page you’re looking for.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<Button href="/">Go back home</Button>

			<Button variant="ghost" class="no-underline" href="about-us"
				>Contact Us<span aria-hidden="true" class="pl-2">&rarr;</span></Button
			>
		</div>
	</div>
</main>

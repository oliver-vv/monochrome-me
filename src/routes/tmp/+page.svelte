<script lang="ts">
	import { onMount } from 'svelte';

	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	import * as Card from '$lib/components/ui/card';

	let activeSection = '';

	onMount(() => {
		const handleScroll = () => {
			const sections = document.querySelectorAll('h2');
			let current = '';

			sections.forEach((section) => {
				const sectionTop = section.offsetTop;
				if (window.scrollY >= sectionTop - 100) {
					current = section.getAttribute('id') || '';
				}
			});

			activeSection = current;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div class="min-h-screen w-full bg-gray-50 text-gray-900 transition-colors duration-300">
	//BlogImage

	<div class="mx-auto flex max-w-6xl flex-col gap-10 px-8 py-16">
		<Card.Root class="mb-16 overflow-hidden shadow-xl">
			<Card.Header>
				<Card.Title class="mb-6 text-4xl font-bold tracking-tight sm:text-5xl"
					>Pose Tips & Tricks</Card.Title
				>
				<Card.Description>Published on August 24, 2024</Card.Description>
			</Card.Header>

			<Card.Footer class="flex justify-start gap-4">
				<Badge variant="outline" class="px-2 py-1 text-sm hover:bg-red-600 hover:text-white"
					>Tips & Tricks</Badge
				>
				<Badge variant="outline" class="px-2 py-1 text-sm hover:bg-red-600 hover:text-white"
					>Helpful Hints</Badge
				>
			</Card.Footer>
		</Card.Root>

		<div class="flex gap-16">
			<aside class="sticky top-8 hidden w-72 self-start lg:block">
				<nav class="space-y-2">
					{#each ['Lorem-1', 'Lorem-2', 'Lorem-3'] as id}
						<a
							href={`#${id}`}
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

			<article class="flex max-w-none flex-col gap-16 lg:max-w-3xl">
				<p class="lead mb-12 text-2xl">
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
					invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
					accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
					sanctus est Lorem ipsum dolor sit amet.
				</p>

				<div>
					<h2 id="Lorem-1" class="mb-8 scroll-mt-24 text-4xl font-bold">
						Lorem ipsum dolor sit amet, consetetur sadipscing
					</h2>
					<p class="mb-8">
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
						accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
						sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
						sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
						aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
						rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
						amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
						tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
						et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
						sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in
						vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at
						vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
						delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
					</p>
				</div>

				<div>
					<h2 id="Lorem-2" class="mb-8 scroll-mt-24 text-4xl font-bold">Lorem ipsum dolor</h2>
					<p class="mb-8">
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
						accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
						sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
						sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
						aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
						rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
						amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
						tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
						et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
						sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in
						vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at
						vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
						delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
						consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
						magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
						ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
						eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
						dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
						blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam
						liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod
						mazim placerat facer
					</p>
				</div>

				<div>
					<h2 id="Lorem-3" class="mb-8 scroll-mt-24 text-4xl font-bold">
						Lorem ipsum dolor sit amet
					</h2>
					<p class="mb-8">
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
						invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
						accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
						sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
						sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
						aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
						rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
						amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
						tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
						et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
						sanctus est Lorem ipsum dolor sit amet.
					</p>
				</div>

				<div class="mt-16 rounded-lg bg-gray-100 p-8 dark:bg-gray-800">
					<h3 class="mb-4 text-2xl font-bold">Share this article</h3>
					<div class="flex space-x-4">
						<Button variant="outline" class="text-red-500 hover:bg-red-500 hover:text-white">
							Twitter
						</Button>
						<Button variant="outline" class="text-red-500 hover:bg-red-500 hover:text-white">
							LinkedIn
						</Button>
						<Button variant="outline" class="text-red-500 hover:bg-red-500 hover:text-white">
							Facebook
						</Button>
					</div>
				</div>
			</article>
		</div>
	</div>
</div>

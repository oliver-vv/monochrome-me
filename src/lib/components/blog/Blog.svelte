<script lang="ts">
	import { onMount } from 'svelte';
	import BlogImage from './BlogImage.svelte';
	import BlogHeader from './BlogHeader.svelte';
	import BlogSection from './BlogSection.svelte';
	import ShareSection from './ShareSection.svelte';
	import BlogSidebar from './BlogSidebar.svelte';

	export let activeSection = '';
	let sections: string[] = [];

	onMount(() => {
		const sectionElements = document.querySelectorAll('h2[id]');
		sections = Array.from(sectionElements).map((el) => el.id);

		const handleScroll = () => {
			const scrollPosition = window.scrollY + 100; // Add some offset

			for (let i = sections.length - 1; i >= 0; i--) {
				const section = document.getElementById(sections[i]);
				if (section && scrollPosition >= section.offsetTop) {
					activeSection = sections[i];
					break;
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Call once to set initial active section
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToSection(sectionId: string) {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
			activeSection = sectionId; // Update activeSection when clicking a link
		}
	}

	const C = {
		BlogImage,
		BlogHeader,
		BlogSection,
		ShareSection,
		BlogSidebar
	};
</script>

<div class="min-h-screen w-full bg-gray-50 text-gray-900 transition-colors duration-300">
	<div class="mx-auto flex max-w-6xl flex-col gap-10 px-8 py-16">
		<slot {C} />
		<div class="flex gap-16">
			<BlogSidebar {activeSection} {sections} on:click={(e) => scrollToSection(e.detail)} />
			<article class="flex max-w-none flex-col lg:max-w-3xl">
				<slot name="content" {C} />
			</article>
		</div>
	</div>
</div>

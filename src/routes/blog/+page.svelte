<script lang="ts">
	import Blog from '$lib/components/blog/Blog.svelte';
</script>

<Blog let:C>
	<C.BlogImage />
	<C.BlogHeader title="Tips and Tricks" publishDate="August 24, 2024" tags={['Lorem', 'Ipsum']} />

	<div slot="content" let:C>
		<C.BlogSection id="section-1" title="Section 1">
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
				et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
				Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
				diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
				gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
				amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
				dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
				et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
				amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
				consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
				odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
				nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
				nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
				veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
				commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
				molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et
				iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te
				feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil
				imperdiet doming id quod mazim placerat facer
			</p>
		</C.BlogSection>

		<C.BlogSection id="section-2" title="Section 2">
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
				et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
				Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
				diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
				gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
				amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
				dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
				et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
				amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
				consequat
			</p>
		</C.BlogSection>

		<C.BlogSection id="section-3" title="Section 3">
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
				et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
				Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
				diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
				gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
				amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
				dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
				et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
				amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
				consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
				odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
				nulla facilisi. Lorem ipsum dolor sit ametLorem ipsum dolor sit amet, consetetur sadipscing
				elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
				diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
				gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
				amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
				dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
				et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
				amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
				et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
				Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
				esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
				accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis
				dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
				sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
				wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
				aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
				velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
				accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis
				dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue
				nihil imperdiet doming id quod mazim placerat facer
			</p>
		</C.BlogSection>

		<C.ShareSection />
	</div>
</Blog>

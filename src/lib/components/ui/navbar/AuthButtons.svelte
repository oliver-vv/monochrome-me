<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex gap-4">
	<Button
		variant="secondary"
		href="/auth/login"
		class="font-mono text-base font-medium text-[#2d2d2d]"
	>
		Login
	</Button>
	<Button href="/auth/register" class="font-mono text-base font-medium">Register</Button>
</div>

<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Recent Sales</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-8">
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="/avatars/01.png" alt="Avatar" />
				<Avatar.Fallback>OM</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">Olivia Martin</p>
				<p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
			</div>
			<div class="ml-auto font-medium">+$1,999.00</div>
		</div>
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="/avatars/02.png" alt="Avatar" />
				<Avatar.Fallback>JL</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">Jackson Lee</p>
				<p class="text-sm text-muted-foreground">jackson.lee@email.com</p>
			</div>
			<div class="ml-auto font-medium">+$39.00</div>
		</div>
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="/avatars/03.png" alt="Avatar" />
				<Avatar.Fallback>IN</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">Isabella Nguyen</p>
				<p class="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
			</div>
			<div class="ml-auto font-medium">+$299.00</div>
		</div>
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="/avatars/04.png" alt="Avatar" />
				<Avatar.Fallback>WK</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">William Kim</p>
				<p class="text-sm text-muted-foreground">will@email.com</p>
			</div>
			<div class="ml-auto font-medium">+$99.00</div>
		</div>
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="/avatars/05.png" alt="Avatar" />
				<Avatar.Fallback>SD</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">Sofia Davis</p>
				<p class="text-sm text-muted-foreground">sofia.davis@email.com</p>
			</div>
			<div class="ml-auto font-medium">+$39.00</div>
		</div>
	</Card.Content>
</Card.Root>

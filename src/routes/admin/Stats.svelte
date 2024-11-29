<script lang="ts">
	import DollarSign from 'lucide-svelte/icons/dollar-sign';
	import Users from 'lucide-svelte/icons/users';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import Activity from 'lucide-svelte/icons/activity';

	import * as Card from '$lib/components/ui/card/index.js';
</script>

<div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
			<DollarSign class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">$45,231.89</div>
			<p class="text-xs text-muted-foreground">+20.1% from last month</p>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Subscriptions</Card.Title>
			<Users class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">+2350</div>
			<p class="text-xs text-muted-foreground">+180.1% from last month</p>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Sales</Card.Title>
			<CreditCard class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">+12,234</div>
			<p class="text-xs text-muted-foreground">+19% from last month</p>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Active Now</Card.Title>
			<Activity class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">+573</div>
			<p class="text-xs text-muted-foreground">+201 since last hour</p>
		</Card.Content>
	</Card.Root>
</div>

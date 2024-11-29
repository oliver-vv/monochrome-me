<script lang="ts">
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import { onMount } from 'svelte';
	import { format } from 'date-fns';

	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import type { slots } from '@prisma/client';

	let bookedSlots: slots[] = [];

	onMount(async () => {
		try {
			const response = await fetch('/api/get-todays-bookings');
			if (!response.ok) {
				throw new Error('Failed to fetch bookings');
			}
			const data = await response.json();
			bookedSlots = data.bookedSlots;
		} catch (error) {
			console.error('Error fetching bookings:', error);
		}
	});

	function formatTime(dateTime: Date) {
		return format(dateTime, 'HH:mm');
	}
</script>

<Card.Root class="xl:col-span-2">
	<Card.Header class="flex flex-row items-center">
		<div class="grid gap-2">
			<Card.Title>Today's Bookings</Card.Title>
			<Card.Description>Booked slots for {format(new Date(), 'MMMM d, yyyy')}</Card.Description>
		</div>
		<Button href="/admin/bookings" size="sm" class="ml-auto gap-1">
			View All
			<ArrowUpRight class="h-4 w-4" />
		</Button>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Time</Table.Head>
					<Table.Head class="hidden xl:table-cell">Room</Table.Head>
					<Table.Head class="hidden xl:table-cell">User ID</Table.Head>
					<Table.Head class="text-right">Status</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each bookedSlots as slot}
					<Table.Row>
						<Table.Cell>
							<div class="font-medium">
								{formatTime(slot.startTime)} - {formatTime(slot.endTime)}
							</div>
						</Table.Cell>
						<Table.Cell class="hidden xl:table-cell">{slot.room}</Table.Cell>
						<Table.Cell class="hidden xl:table-cell">{slot.stripeSessionId || 'N/A'}</Table.Cell>
						<Table.Cell class="text-right">
							<Badge variant="outline">Booked</Badge>
						</Table.Cell>
					</Table.Row>
				{/each}
				{#if bookedSlots.length === 0}
					<Table.Row>
						<Table.Cell colspan={4} class="text-center">No bookings for today</Table.Cell>
					</Table.Row>
				{/if}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>

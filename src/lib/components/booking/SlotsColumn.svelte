<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	// import type { ITimeSlot } from '../../../components/TimeSlot';
	import { selectedSlots } from '../../../stores/bookingStore';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import type { slots } from '@prisma/client';
	import { format } from 'date-fns';

	export let date: Date;
	export let slots: slots[];
	export let isLoading: boolean = false;

	function selectSlot(slot: slots) {
		selectedSlots.update((currentSlots) => {
			const slotIndex = currentSlots.findIndex((s) => s.id === slot.id);
			if (slotIndex === -1) {
				return [...currentSlots, slot];
			} else {
				return currentSlots.filter((s) => s.id !== slot.id);
			}
		});
	}

	function formatTimeSlot(slot: slots) {
		return `${format(slot.startTime, 'HH:mm')}-${format(slot.endTime, 'HH:mm')}`;
	}
</script>

<div class="flex flex-col gap-4">
	<div class="mb-6 border-l-2 pl-4">
		<p class="text-lg">{format(date, 'EEE').toUpperCase()}</p>
		<p class="text-3xl">{format(date, 'd')}</p>
	</div>

	<!-- {#if isLoading}
		{#each Array(11) as _}
			<Skeleton class="h-14 w-full rounded-md" />
		{/each} -->
	{#if slots.length === 0}
		<p class="text-muted-foreground">No slots available</p>
	{:else}
		{#each slots as slot (slot.id)}
			<Button
				variant="outline"
				class={$selectedSlots.some((s) => s.id === slot.id)
					? 'h-14 bg-red-400 hover:bg-red-300'
					: 'h-14 bg-transparent hover:bg-red-300'}
				on:click={() => selectSlot(slot)}
			>
				{formatTimeSlot(slot)}
			</Button>
		{/each}
	{/if}
</div>

<!-- class:bg-primary-100={$selectedSlots.some((s) => s.id === slot.id)} -->

<!-- class:bg-primary={$selectedSlots.some((s) => s.id === slot.id)}
class:text-primary-foreground={$selectedSlots.some((s) => s.id === slot.id)} -->

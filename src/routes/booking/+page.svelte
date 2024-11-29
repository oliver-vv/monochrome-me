<script lang="ts">
	import { writable } from 'svelte/store';
	import { selectedDate } from '../../stores/selectedDateStore';
	import { onMount } from 'svelte';
	import { addDays, format, parseISO } from 'date-fns';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import * as Select from '$lib/components/ui/select';
	import CalendarV2 from '../../components/Booking/CalendarV2.svelte';
	import { selectedSlots } from '../../stores/bookingStore';
	// import type { ITimeSlot } from '../../components/TimeSlot';
	import type { Selected } from 'bits-ui';
	import SlotsColumn from '$lib/components/booking/SlotsColumn.svelte';
	import type { slots } from '@prisma/client';

	$: currentDate = $selectedDate;
	$: nextDate = addDays(currentDate, 1);
	$: thirdDate = addDays(currentDate, 2);

	let slotsForDates: {
		[date: string]: {
			white: slots[];
			black: slots[];
		};
	} = {};
	let selectedRoom: Selected<string> = { value: 'WHITE', label: 'White Room' };

	const rooms = [
		{ value: 'WHITE', label: 'White Room' },
		{ value: 'BLACK', label: 'Black Room' }
	];

	onMount(async () => {
		await fetchSlotsForMultipleDates([currentDate, nextDate, thirdDate]);
	});

	let error = '';
	let isLoadingSlots: boolean = false;

	async function fetchSlotsForMultipleDates(dates: Date[]) {
		isLoadingSlots = true;
		const dateStrings = dates.map((date) => format(date, 'yyyy-MM-dd'));
		try {
			const response = await fetch(`/api/get-slots-for-dates?dates=${dateStrings.join(',')}`);
			if (!response.ok) {
				throw new Error(`Error fetching slots: ${response.statusText}`);
			}
			const data = await response.json();
			slotsForDates = data.slots;
		} catch (err) {
			error = (err as Error).message;
		} finally {
			isLoadingSlots = false;
		}
	}

	async function fetchSlots(date: string) {
		try {
			const response = await fetch(`/api/get-slots-for-date?date=${date}`);
			if (!response.ok) {
				throw new Error(`Error fetching slots: ${response.statusText}`);
			}
			const data = await response.json();
			slotsForDates[date] = data.slots;
		} catch (err) {
			error = (err as Error).message;
		}
	}

	function handleRoomChange(selected: Selected<string> | undefined) {
		if (selected) {
			selectedRoom = {
				value: selected.value,
				label: selected.label ?? ''
			};
			console.log('room changed to', selected.value);
		}
	}

	$: displaySlots = (date: Date) => {
		const dateString = format(date, 'yyyy-MM-dd');
		const roomKey = selectedRoom.value.toLowerCase() as 'black' | 'white';
		return slotsForDates[dateString]?.[roomKey] || [];
	};
	// const locations = [{ value: 'Kantstr', label: 'Kantstrasse 3, 10965 Berlin' }];
</script>

<div class="mt-16 flex w-[1200px] items-start justify-center gap-16">
	<div class="flex flex-row gap-10">
		<SlotsColumn date={currentDate} slots={displaySlots(currentDate)} isLoading={isLoadingSlots} />
		<SlotsColumn date={nextDate} slots={displaySlots(nextDate)} isLoading={isLoadingSlots} />
		<SlotsColumn date={thirdDate} slots={displaySlots(thirdDate)} isLoading={isLoadingSlots} />
	</div>

	<div class="flex h-full flex-col items-center justify-center gap-10 px-4">
		<div class="flex w-full flex-col gap-4">
			<div class="w-full rounded-md border px-4 py-3 font-mono text-sm">
				<p>Am Tempelhofer Berg 6, 10965 Berlin</p>
			</div>

			<Select.Root selected={selectedRoom} onSelectedChange={handleRoomChange}>
				<Select.Trigger class="w-full px-4 py-3">
					<Select.Value placeholder="Select a room" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Rooms</Select.Label>
						{#each rooms as room}
							<Select.Item value={room.value}>{room.label}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>

			<div class="w-full rounded-md border px-4 py-3 font-mono text-sm">
				{#if $selectedSlots.length === 0}
					<p>No slots selected</p>
				{:else}
					{#each $selectedSlots as slot}
						<p class="mb-2">
							{format(slot.startTime, 'MMM d')},
							{format(slot.startTime, 'HH:mm')}-{format(slot.endTime, 'HH:mm')}
						</p>
					{/each}
				{/if}
			</div>
		</div>

		<div class="flex w-full flex-col gap-4">
			<CalendarV2 />
			<Button class="w-full">Continue</Button>
		</div>
	</div>
</div>

<script lang="ts">
	//import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { selectedDate } from '../../stores/selectedDateStore';

	import * as Tabs from '$lib/components/ui/tabs';

	import { selectedSlots } from '../../stores/bookingStore';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import type { ITimeSlot } from '../TimeSlot';

	export let whiteRoomSlots: ITimeSlot[];
	export let blackRoomSlots: ITimeSlot[];

	function selectSlot(slot: ITimeSlot) {
		selectedSlots.update((currentSlots) => {
			const slotIndex = currentSlots.findIndex((s) => s.id === slot.id);
			if (slotIndex === -1) {
				// Slot not yet selected, add it
				return [...currentSlots, slot];
			} else {
				// Slot already selected, remove it
				return currentSlots.filter((s) => s.id !== slot.id);
			}
		});
		console.log('SelectedSlots: ', $selectedSlots);
	}
</script>

<div class="flex flex-shrink-0 flex-col items-start gap-6">
	<p class="text-2xl">
		{$selectedDate.toLocaleDateString('en-us', {
			weekday: 'long',
			day: 'numeric',
			month: 'short'
		})}
	</p>

	<div class="w-full">
		<Tabs.Root value="whiteRoom" class="w-full">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="whiteRoom">White Room</Tabs.Trigger>
				<Tabs.Trigger value="blackRoom">Black Room</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="whiteRoom"
				><ScrollArea class="h-[400px] w-[450px] rounded-md p-4" type="always">
					{#each whiteRoomSlots as slot (slot.id)}
						<div class="flex flex-col">
							<div class=" flex items-start">
								<Button
									variant="ghost"
									class="h-16 w-full justify-start gap-6 rounded-none border-b border-b-gray-300"
									on:click={() => selectSlot(slot)}
								>
									{#if $selectedSlots.some((s) => s.id === slot.id)}
										<svg
											width="14"
											height="15"
											viewBox="0 0 14 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle id="Ellipse 2" cx="7" cy="7.35715" r="7" fill="#CF002C" />
										</svg>
									{:else}
										<svg
											width="14"
											height="15"
											viewBox="0 0 14 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle id="Ellipse 2" cx="7" cy="7.35715" r="7" fill="#008E17" />
										</svg>
									{/if}
									{slot.startTime.split('T')[1].substring(0, 5)} -
									{slot.endTime.split('T')[1].substring(0, 5)}
								</Button>
							</div>
						</div>
					{/each}
					{#if blackRoomSlots.length === 0}
						<p class="pt-5 text-center text-muted-foreground">No slots available</p>
					{/if}
				</ScrollArea></Tabs.Content
			>
			<Tabs.Content value="blackRoom"
				><ScrollArea class="h-[400px] w-[450px] rounded-md  p-4" type="always">
					{#each blackRoomSlots as slot (slot.id)}
						<div class="flex flex-col">
							<div class=" flex items-start">
								<Button
									variant="ghost"
									class="h-16 w-full justify-start gap-6 rounded-none border-b border-b-gray-300"
									on:click={() => selectSlot(slot)}
								>
									{#if $selectedSlots.some((s) => s.id === slot.id)}
										<svg
											width="14"
											height="15"
											viewBox="0 0 14 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle id="Ellipse 2" cx="7" cy="7.35715" r="7" fill="#CF002C" />
										</svg>
									{:else}
										<svg
											width="14"
											height="15"
											viewBox="0 0 14 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle id="Ellipse 2" cx="7" cy="7.35715" r="7" fill="#008E17" />
										</svg>
									{/if}
									{slot.startTime.split('T')[1].substring(0, 5)} -
									{slot.endTime.split('T')[1].substring(0, 5)}
								</Button>
							</div>
						</div>
					{/each}
					{#if blackRoomSlots.length === 0}
						<p class="pt-5 text-center text-muted-foreground">No slots available</p>
					{/if}
				</ScrollArea>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>

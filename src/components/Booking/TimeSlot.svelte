<script lang="ts">
	import { format } from 'date-fns';

	import type { ITimeSlot } from '../TimeSlot';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let slot: ITimeSlot;

	let isSelected = false;

	function onSelect() {
		isSelected = !isSelected;
		dispatch('slotSelect', slot);
	}

	// format(slot.startTime, 'HH:mm')} - {format(slot.endTime, 'HH:mm')
</script>

<button
	type="button"
	class="variant-soft-secondary btn text-left {isSelected ? 'bg-primary-500 text-white' : ''}"
	on:click={() => onSelect()}
	>{slot.startTime} - {slot.endTime}
</button>

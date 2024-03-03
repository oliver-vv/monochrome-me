<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { authHandlers, user } from '../../stores/authStore';
	import { cancelBookedSlot, getUserBookedSlots } from '../../lib/firebase/firebase';
	// import { Drawer, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	// import type { DrawerSettings, TableSource } from '@skeletonlabs/skeleton';
	import type { ITimeSlot } from '../../components/TimeSlot';
	import { format } from 'date-fns';

	// import { getDrawerStore } from '@skeletonlabs/skeleton';
	// import { bookings } from '../../stores/bookingStore';

	let isLoading = true;
	let bookedSlots: any[] = [];

	$: $user && fetchData();

	async function fetchData() {
		isLoading = true;
		try {
			if ($user) {
				bookedSlots = await getUserBookedSlots($user.uid);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			isLoading = false;
		}
	}

	// If sourceData updates, set the new TableSource values

	function onSelect(event: any) {
		console.log('meta: ', event.detail);

		//drawer

		//bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50'
		// drawerStore.open(drawerSettings);
	}

	function handleCancel(slotId: string, roomType: 'black' | 'white', dateString: string) {
		console.log('handleCancel');

		if ($user) {
			cancelBookedSlot(slotId, dateString, $user.uid);
		}
	}
</script>

<p>TEst</p>

<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';

	import { Separator } from '$lib/components/ui/separator';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import { mediaQuery } from 'svelte-legos';
	import { selectedSlots } from '../../stores/bookingStore';

	import type { ITimeSlot } from '../../components/TimeSlot';
	import { type DateValue, DateFormatter, today } from '@internationalized/date';

	import CalendarIcon from 'svelte-radix/Calendar.svelte';
	import Reload from 'svelte-radix/Reload.svelte';

	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select';
	import * as Drawer from '$lib/components/ui/drawer';
	import { format } from 'date-fns';

	let blackRoomSlots: ITimeSlot[] = [];
	let whiteRoomSlots: ITimeSlot[] = [];

	let value = today('Europe/Berlin');

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let error = '';

	onMount(async () => {
		fetchSlots(value.toString());
		console.log(blackRoomSlots, whiteRoomSlots);
	});

	const isDesktop = mediaQuery('(min-width: 768px)');

	let isLoadingSlots: boolean = false;
	let isLoadingCheckout: boolean = false;

	async function fetchSlots(date: string) {
		try {
			const response = await fetch(`/api/get-slots-for-date?date=${date}`);
			if (!response.ok) {
				throw new Error(`Error fetching slots: ${response.statusText}`);
			}
			const data = await response.json();
			blackRoomSlots = data.blackRoomSlots;
			whiteRoomSlots = data.whiteRoomSlots;
		} catch (err) {
			error = (err as Error).message;
		}

		// const slotsForSelectedDate = await prisma.slots.findMany({
		// 	where: {
		// 		date: new Date(date)
		// 	},
		// 	orderBy: {
		// 		startTime: 'asc' // Or 'desc' depending on how you want to order the rooms
		// 	}
		// });
		// blackRoomSlots = slotsForSelectedDate.filter((slot: ITimeSlot) => slot.room === 'BLACK');
		// whiteRoomSlots = slotsForSelectedDate.filter((slot: ITimeSlot) => slot.room === 'WHITE');
		// console.log(blackRoomSlots, whiteRoomSlots);
	}

	// const df = new DateFormatter('en-US', {
	// 	dateStyle: 'long'
	// });

	const items = [
		{ value: 0, label: 'Today' },
		{ value: 1, label: 'Tomorrow' },
		{ value: 3, label: 'In 3 days' },
		{ value: 7, label: 'In a week' }
	];

	async function bookSlots() {
		isLoadingCheckout = true;
		const session = await checkout($selectedSlots);
		if (session) {
			window.location.replace(session.url);
		}
	}

	async function checkout(slots: ITimeSlot[]) {
		const {
			data: { user }
		} = await supabase.auth.getUser();

		if (!user) {
			return;
		}
		// time: `${slot.startTime.split('T')[1].substring(0, 5)} - ${slot.endTime.split('T')[1].substring(0, 5)}`
		const slotIds = $selectedSlots.map((slot) => slot.id);
		const data = await fetch('/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ uId: user.id, date: value.toString(), slotIds: slotIds })
		}).then((data) => data.json());
		return data;
	}

	$: if (value) {
		fetchSlots(value.toString());
	}

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

	let open = false;
</script>

<main class="w-full border border-violet-100">
	<div class="w-full border border-violet-400">
		<div class="flex flex-col items-center justify-center md:flex-row">
			<div class=" w-[500px] border border-green-500">
				<Calendar
					bind:value
					class=" w-full rounded-md border border-blue-500 p-0 md:block"
					minValue={today('Europe/Berlin')}
				/>
			</div>

			<!-- <div class="block md:hidden">
			<Popover.Root openFocus>
				<Popover.Trigger asChild let:builder>
					<Button
						variant="outline"
						class={cn(
							'w-[240px] justify-start text-left font-normal',
							!value && 'text-muted-foreground'
						)}
						builders={[builder]}
					>
						<CalendarIcon class="mr-2 h-4 w-4" />
						{value ? df.format(value.toDate('Europe/Berlin')) : 'Pick a date'}
					</Button>
				</Popover.Trigger>
				<Popover.Content class="flex w-auto flex-col space-y-2 p-2">
					<Select.Root
						{items}
						onSelectedChange={(v) => {
							if (!v) return;
							value = today('Europe/Berlin').add({ days: v.value });
						}}
					>
						<Select.Trigger>
							<Select.Value placeholder="Select" />
						</Select.Trigger>
						<Select.Content>
							{#each items as item}
								<Select.Item value={item.value}>{item.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<div class="rounded-md border">
						<Calendar bind:value minValue={today('Europe/Berlin')} />
					</div>
				</Popover.Content>
			</Popover.Root>
		</div> -->

			<!-- <Separator class="mx-10 hidden h-72 md:block" orientation="vertical" /> -->
			<!-- <Separator class="my-2 w-3/4 md:hidden" orientation="horizontal" /> -->

			<div class="">
				<Tabs.Root
					value="whiteRoom"
					class="min-h-[400px] w-[400px]"
					onValueChange={() => ($selectedSlots = [])}
				>
					<Tabs.List class="grid w-full grid-cols-2">
						<Tabs.Trigger value="whiteRoom">White Room</Tabs.Trigger>
						<Tabs.Trigger value="blackRoom">Black Room</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="whiteRoom">
						<div class="grid grid-cols-2 gap-4">
							{#if !isLoadingSlots}
								{#each whiteRoomSlots as slot (slot.id)}
									{#if $selectedSlots.some((s) => s.id === slot.id)}
										<Button
											variant="outline"
											class="h-12 bg-red-100 hover:bg-red-100"
											on:click={() => selectSlot(slot)}
										>
											{slot.startTime.split('T')[1].substring(0, 5)} -
											{slot.endTime.split('T')[1].substring(0, 5)}
										</Button>
									{:else}
										<Button variant="outline" class="h-12" on:click={() => selectSlot(slot)}>
											{slot.startTime.split('T')[1].substring(0, 5)} -
											{slot.endTime.split('T')[1].substring(0, 5)}
										</Button>
									{/if}
								{/each}

								{#if whiteRoomSlots.length === 0}
									<p class="col-span-2 pt-5 text-center text-muted-foreground">
										No slots available
									</p>
								{/if}
							{:else}
								{#each Array(12).fill(0) as _, index}
									<Skeleton class="h-[50px] w-full rounded-xl" />
								{/each}
							{/if}
						</div>
					</Tabs.Content>
					<Tabs.Content value="blackRoom">
						<div class="grid grid-cols-2 gap-4">
							{#if !isLoadingSlots}
								{#each blackRoomSlots as slot (slot.id)}
									{#if $selectedSlots.some((s) => s.id === slot.id)}
										<Button
											variant="outline"
											class="h-12 bg-red-100 hover:bg-red-100"
											on:click={() => selectSlot(slot)}
										>
											{slot.startTime.split('T')[1].substring(0, 5)} -
											{slot.endTime.split('T')[1].substring(0, 5)}
										</Button>
									{:else}
										<Button variant="outline" class="h-12" on:click={() => selectSlot(slot)}>
											{slot.startTime.split('T')[1].substring(0, 5)} -
											{slot.endTime.split('T')[1].substring(0, 5)}
										</Button>
									{/if}
								{/each}

								{#if blackRoomSlots.length === 0}
									<p class="col-span-2 pt-5 text-center text-muted-foreground">
										No slots available
									</p>
								{/if}
							{:else}
								{#each Array(12).fill(0) as _, index}
									<Skeleton class="h-[50px] w-full rounded-xl" />
								{/each}
							{/if}
						</div>
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
		<!-- Show Checkout button if slots are selected; Alert Dialog for verification; Drawer for mobile -->
		{#if $selectedSlots.length > 0}
			<div class="flex items-center justify-center pt-10">
				{#if $isDesktop}
					<AlertDialog.Root>
						<AlertDialog.Trigger asChild let:builder>
							{#if isLoadingCheckout}
								<Button disabled>
									<Reload class="mr-2 h-4 w-4 animate-spin" />
									Please wait
								</Button>
							{:else}
								<Button builders={[builder]}>Checkout</Button>
							{/if}
						</AlertDialog.Trigger>
						<AlertDialog.Content>
							<AlertDialog.Header>
								<AlertDialog.Title>Are you sure you want to checkout?</AlertDialog.Title>
								<AlertDialog.Description>
									You will be redirected to the payment site. Please make sure you have selected the
									correct slots.
								</AlertDialog.Description>
							</AlertDialog.Header>
							<AlertDialog.Footer>
								<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
								<AlertDialog.Action on:click={() => bookSlots()}>Continue</AlertDialog.Action>
							</AlertDialog.Footer>
						</AlertDialog.Content>
					</AlertDialog.Root>
				{:else}
					<!-- <Drawer.Root bind:open>
					<Drawer.Trigger asChild let:builder>
						{#if isLoadingCheckout}
							<Button disabled>
								<Reload class="mr-2 h-4 w-4 animate-spin" />
								Please wait
							</Button>
						{:else}
							<Button builders={[builder]}>Checkout</Button>
						{/if}
					</Drawer.Trigger>
					<Drawer.Content>
						<Drawer.Header class="text-left">
							<Drawer.Title>Are you sure you want to checkout?</Drawer.Title>
							<Drawer.Description>
								You will be redirected to the payment site. Please make sure you have selected the
								correct slots.
							</Drawer.Description>
						</Drawer.Header>

						<Drawer.Footer class="pt-2">
							<Drawer.Close asChild let:builder>
								<Button variant="outline" builders={[builder]}>Cancel</Button>
								<Button builders={[builder]} on:click={() => bookSlots()}>Continue</Button>
							</Drawer.Close>
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer.Root> -->
				{/if}
			</div>
		{/if}
	</div>
</main>

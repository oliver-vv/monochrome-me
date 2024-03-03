<script lang="ts">
	import {
		add,
		eachDayOfInterval,
		endOfMonth,
		endOfWeek,
		format,
		getDay,
		isEqual,
		isPast,
		isSameMonth,
		isToday,
		parse,
		startOfDay
	} from 'date-fns';

	import { createEventDispatcher } from 'svelte';
	import type { ITimeSlot } from '../TimeSlot';
	import TimeSlot from './TimeSlot.svelte';
	import { selectedSlots } from '../../stores/bookingStore';

	import { Button } from '$lib/components/ui/button';

	export let blackRoomSlots: ITimeSlot[];
	export let whiteRoomSlots: ITimeSlot[];
	export let initialDate: Date;
	export let isLoadingSlots: boolean;

	let colStartClasses = [
		'', // MONDAY
		'col-start-1', //TUESDAY
		'col-start-2', //WEDNESDAY
		'col-start-3', //THURSDAY
		'col-start-4', //FRIDAY
		'col-start-5', //SATURDAY
		'col-start-6' //SUNDAY
	];

	let selectedDate: Date = startOfDay(initialDate);

	// let selectedSlots: ITimeSlot[] = [];

	let tabSet: number = 0;

	let currentMonth = format(selectedDate, 'MMM-yyyy');

	$: firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

	$: days = eachDayOfInterval({
		start: firstDayCurrentMonth,
		end: endOfMonth(firstDayCurrentMonth)
	});

	const dispatch = createEventDispatcher();

	function classNames(...classes: (string | boolean)[]) {
		return classes.filter(Boolean).join(' ');
	}

	function previousMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
		currentMonth = format(firstDayNextMonth, 'MMM-yyyy');
	}

	function nextMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
		currentMonth = format(firstDayNextMonth, 'MMM-yyyy');
	}

	function onDateSelect(newDate: Date) {
		selectedDate = newDate;
		dispatch('dateChange', selectedDate);
	}

	function onSlotSelect(event: { detail: ITimeSlot }) {
		const slot = event.detail;

		if ($selectedSlots && $selectedSlots.includes(slot)) {
			$selectedSlots = $selectedSlots.filter((current) => current.id !== slot.id);

			console.log('removed slot', $selectedSlots);
			return;
		}
		$selectedSlots = selectedSlots ? [...$selectedSlots, slot] : [slot];
		console.log('added slot', $selectedSlots);
	}

	function onSlotBook() {
		if (selectedSlots) dispatch('slotBooked');
	}

	$: tabSet, ($selectedSlots = []);
</script>

<div class="pt-16">
	<div class="mx-auto max-w-md px-4 sm:px-7 md:max-w-4xl md:px-6">
		<div class="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
			<div class="md:pr-14">
				<div class="flex items-center">
					<h2 class="flex-auto font-semibold text-gray-900">
						{format(firstDayCurrentMonth, 'MMMM yyyy')}
					</h2>
					<button
						type="button"
						on:click={previousMonth}
						class="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
					>
						<span class="sr-only">Previous month</span>
						<i class="fa-solid fa-chevron-left h-5 w-5" aria-hidden="true"></i>
					</button>
					<button
						on:click={nextMonth}
						type="button"
						class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
					>
						<span class="sr-only">Next month</span>
						<i class="fa-solid fa-chevron-right h-5 w-5" aria-hidden="true"></i>
					</button>
				</div>
				<div class="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
					<div>M</div>
					<div>T</div>
					<div>W</div>
					<div>T</div>
					<div>F</div>
					<div>S</div>
					<div>S</div>
				</div>
				<div class="mt-2 grid grid-cols-7 text-sm">
					{#each days as day, index (day.toString())}
						<!-- add to div below key={day.toString()} -->
						<div class={classNames(index === 0 && colStartClasses[getDay(day)], 'py-1.5')}>
							<button
								type="button"
								on:click={() => onDateSelect(day)}
								class={classNames(
									isEqual(day, selectedDate) && 'text-white',
									!isEqual(day, selectedDate) && isToday(day) && 'text-red-500',
									!isEqual(day, selectedDate) &&
										!isToday(day) &&
										isSameMonth(day, firstDayCurrentMonth) &&
										'text-gray-900',
									!isEqual(day, selectedDate) &&
										!isToday(day) &&
										!isSameMonth(day, firstDayCurrentMonth) &&
										'text-gray-400',
									isEqual(day, selectedDate) && isToday(day) && 'bg-red-500',
									isEqual(day, selectedDate) && !isToday(day) && 'bg-gray-900',
									!isEqual(day, selectedDate) && 'hover:bg-gray-200',
									(isEqual(day, selectedDate) || isToday(day)) && 'font-semibold',
									'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
								)}
								disabled={isPast(day) && !isToday(day)}
							>
								<time dateTime={format(day, 'yyyy-MM-dd')}>
									{format(day, 'd')}
								</time>
							</button>
						</div>
					{/each}
				</div>
			</div>

			<section class="mt-12 md:mt-0 md:pl-14">
				<h2 class="font-semibold text-gray-900">
					Available slots for{' '}
					<time dateTime={format(selectedDate, 'yyyy-MM-dd')}>
						{format(selectedDate, 'MMM dd, yyy')}
					</time>
				</h2>

				<div class="mt-4">
					// {#each blackRoomSlots as slot (slot.id)}
						// <TimeSlot {slot} on:slotSelect={onSlotSelect} />
						//
					{/each}
				</div>
			</section>
		</div>
		{#if selectedSlots}
			<Button on:click={() => onSlotBook()}>Continue with booking</Button>
		{/if}
	</div>
</div>

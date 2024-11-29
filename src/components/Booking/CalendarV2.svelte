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

	let colStartClasses = [
		'', // MONDAY
		'col-start-1', //TUESDAY
		'col-start-2', //WEDNESDAY
		'col-start-3', //THURSDAY
		'col-start-4', //FRIDAY
		'col-start-5', //SATURDAY
		'col-start-6' //SUNDAY
	];

	import { selectedDate } from '../../stores/selectedDateStore';
	import { onMount } from 'svelte';

	onMount(() => {
		onDateSelect(startOfDay(new Date()));
	});

	let selectedDayStart = startOfDay($selectedDate);

	let currentMonth = format(selectedDayStart, 'MMM-yyyy');

	$: firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

	$: days = eachDayOfInterval({
		start: firstDayCurrentMonth,
		end: endOfMonth(firstDayCurrentMonth)
	});

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
		selectedDate.set(newDate);
	}
</script>

<!-- px-4 sm:px-7 md:px-6 -->
<div class="">
	<div class="mx-auto max-w-md md:max-w-4xl">
		<div class="">
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" /></svg
					>
				</button>
				<button
					on:click={nextMonth}
					type="button"
					class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
				>
					<span class="sr-only">Next month</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg
					>
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
					<div class={classNames(index === 0 && colStartClasses[getDay(day)], 'px-1 py-1')}>
						<button
							type="button"
							on:click={() => onDateSelect(day)}
							class={classNames(
								isEqual(day, $selectedDate) && 'text-white',
								!isEqual(day, $selectedDate) && isToday(day) && 'text-red-500', // mark today if not selected
								!isEqual(day, $selectedDate) && // TODO: check
									!isToday(day) &&
									isSameMonth(day, firstDayCurrentMonth) &&
									'text-gray-900',
								!isEqual(day, $selectedDate) &&
									!isToday(day) &&
									!isSameMonth(day, firstDayCurrentMonth) &&
									'text-gray-400',
								isEqual(day, $selectedDate) && isToday(day) && 'bg-red-500',
								isEqual(day, $selectedDate) && !isToday(day) && 'bg-gray-900',
								!isEqual(day, $selectedDate) && 'hover:bg-gray-200',
								(isEqual(day, $selectedDate) || isToday(day)) && 'font-semibold',
								'mx-auto flex h-10 w-10 items-center justify-center rounded-full '
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
	</div>
</div>

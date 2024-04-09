<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';

	let bookingConfirmed = false;
	let checkingStatus = true;

	onMount(async () => {
		const sessionId = $page.url.searchParams.get('session_id');

		if (!sessionId) {
			console.error('Session ID is missing from the URL.');
			goto('/'); // Redirect to home or error page
			return;
		}

		try {
			const response = await fetch(`/api/check-booking-status?session_id=${sessionId}`);
			if (!response.ok) {
				throw new Error('Failed to check booking status');
			}

			const data = await response.json();

			// console.log('Booking confirmed:', data.confirmed);

			bookingConfirmed = data.confirmed;
		} catch (error) {
			console.error('Error checking booking status:', error);
		} finally {
			checkingStatus = false;
		}
	});
</script>

{#if checkingStatus}
	<p>Checking your booking status, please wait...</p>
{:else if bookingConfirmed}
	<div class="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-gray-900">
		<div
			class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md"
			data-v0-t="card"
		>
			<div class="flex flex-col space-y-1.5 p-6">
				<h3 class="whitespace-nowrap tracking-tight text-center text-2xl font-bold">
					Payment Successful
				</h3>
			</div>
			<div class="p-6 text-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-16 w-16 mx-auto text-green-500 dark:text-green-400"
					><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline
						points="22 4 12 14.01 9 11.01"
					></polyline></svg
				>
				<p class="mt-4 text-lg font-semibold">Thank you for your purchase!</p>
				<p class="mt-2 text-gray-500 dark:text-gray-400">
					Your payment was successful and your order is being processed.
				</p>
				<div class="mt-6 grid gap-2">
					<div class="flex justify-between">
						<span class=" font-bold">Amount Paid:</span><span class="text-right">$100.00</span>
					</div>
					<div class="flex justify-between">
						<span class="font-bold">Payment Method:</span><span class="text-right"
							>Visa **** 1234</span
						>
					</div>
					<div class="flex justify-between">
						<span class="font-bold">Timeslot:</span><span class="text-right"
							>Monday, 16.10.2024 <br /> 10:00-11:00</span
						>
					</div>
				</div>
			</div>
			<div class="items-center pb-6 flex justify-center">
				<Button href="/">Back to Homepage</Button>
			</div>
		</div>
	</div>
{:else}
	<h1>Booking Status</h1>
	<p>There was an issue confirming your booking.</p>
{/if}

<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

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
	<h1>Thank you for your booking!</h1>
	<p>Your booking has been successfully confirmed.</p>
{:else}
	<h1>Booking Status</h1>
	<p>There was an issue confirming your booking.</p>
{/if}

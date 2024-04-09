<script>
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-gray-900">
	<div
		class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md"
		data-v0-t="card"
	>
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="whitespace-nowrap tracking-tight text-center text-2xl font-bold">Payment Issue</h3>
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
				class="h-16 w-16 mx-auto text-red-500 dark:text-red-400"
			>
				<circle cx="12" cy="12" r="10"></circle>
				<line x1="12" x2="12" y1="8" y2="12"></line>
				<line x1="12" x2="12.01" y1="16" y2="16"></line>
			</svg>
			<p class="mt-4 text-lg font-semibold">We encountered an issue with your payment.</p>
			<p class="mt-2 text-gray-500 dark:text-gray-400">
				You did not get charged! Please check your payment details and try again.
			</p>
			<div class="mt-6 grid gap-2">
				<div class="flex justify-between">
					<span class="font-bold">Amount:</span>
					<span class="text-right">$100.00</span>
				</div>
				<div class="flex justify-between">
					<span class="font-bold">Payment Method:</span>
					<span class="text-right">Visa **** 1234</span>
				</div>
				<div class="flex justify-between">
					<span class="font-bold">TimeSlot:</span>
					<span class="text-right">Monday, 16.10.2024 <br /> 10:00-11:00</span>
				</div>
			</div>
			<div class="items-center pt-4 flex justify-center">
				<Button href="/">Try again</Button>
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	// import { Stepper, Step, type ToastSettings, getToastStore } from '@skeletonlabs/skeleton';
	// import { user } from '../../stores/authStore';
</script>

<main class="flex h-screen items-center justify-center">
	<slot />
</main>

<!-- <Stepper on:complete={onCompleteHandler} class="mt-5 w-2/4 self-center rounded-xl p-5" }>
	<Step locked={lockedState}>
		<svelte:fragment slot="header">Log In</svelte:fragment>
		<slot />
	</Step>
	<Step>
		<svelte:fragment slot="header">TEST</svelte:fragment>
	</Step>
</Stepper> -->

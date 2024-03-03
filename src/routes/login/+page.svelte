<script lang="ts">
	import { goto } from '$app/navigation';
	// import Authenticate from '../../components/Authenticate.svelte';
	import { authHandlers } from '../../stores/authStore';

	// maybe async
	async function signInWithGoogle() {
		try {
			await authHandlers.signupWithGoogle();

			goto('/dashboard');

			// toastStore.trigger(t);
		} catch (e) {
			console.log('There was an google auth error', e);
			e = true;
		}
	}
</script>

<!-- <Authenticate {signInWithGoogle} /> -->

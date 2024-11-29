<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	import * as Form from '$lib/components/ui/form';

	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema, type LoginSchema } from './schema';

	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';

	let supabase = $page.data.supabase;

	export let data;

	let fdata: SuperValidated<Infer<LoginSchema>> = data;

	const form = superForm(fdata, {
		validators: zodClient(loginSchema),
		onSubmit() {
			if ($errors.email || $errors.password) {
				toast.warning('Invalid email or password');
			}
		},
		onUpdated({ form }) {
			if (form.message) {
				toast.error(form.message);
			}
		}
	});

	const { form: formData, enhance, errors } = form;

	async function signInWithGoogle() {
		supabase.auth.signInWithOAuth({
			provider: 'google'
		});
	}
</script>

<div class="grid gap-5">
	<SuperDebug data={$formData} />

	<Card.Root class="w-full max-w-sm">
		<form method="POST" use:enhance class="">
			<input type="hidden" name="redirect" value={$page.url.searchParams.get('redirect') || '/'} />
			<Card.Header>
				<Card.Title class="text-2xl">Login</Card.Title>
				<Card.Description>Enter your email below to login to your account.</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4">
				<div class="grid gap-2">
					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input {...attrs} bind:value={$formData.email} placeholder="Your email" />
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="password">
						<Form.Control let:attrs>
							<Form.Label>Password</Form.Label>
							<Input
								{...attrs}
								type="password"
								bind:value={$formData.password}
								placeholder="Your password"
							/>
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>
			</Card.Content>
			<Card.Footer>
				<div class="w-full">
					<div class="grid gap-4">
						<Form.Button>Login</Form.Button>
						<Button variant="outline" class="w-full" on:click={() => signInWithGoogle()}
							>Login with Google</Button
						>
					</div>
				</div>
			</Card.Footer>
		</form>
	</Card.Root>
</div>

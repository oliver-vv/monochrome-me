<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';

	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { Input } from '$lib/components/ui/input';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { registerSchema, type RegisterSchema } from './schema';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/stores';

	let supabase = $page.data.supabase;

	export let data: SuperValidated<Infer<RegisterSchema>>;

	const form = superForm(data, {
		validators: zodClient(registerSchema),
		onSubmit() {
			if ($errors.email || $errors.password) {
				toast.warning('Invalid email or password');
			} else if ($errors.confirmPassword) {
				toast.warning('Passwords do not match');
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

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Sign Up</Card.Title>
		<Card.Description>Enter your information to create an account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid gap-4">
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

				<div class="grid gap-2">
					<Form.Field {form} name="confirmPassword">
						<Form.Control let:attrs>
							<Form.Label>Confirm Password</Form.Label>
							<Input
								{...attrs}
								type="password"
								bind:value={$formData.confirmPassword}
								placeholder="Confirm your password"
							/>
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>

				<Form.Button class="w-full">Create an account</Form.Button>
				<Button variant="outline" class="w-full" on:click={() => signInWithGoogle()}
					>Sign up with GitHub</Button
				>
			</div>
		</form>
	</Card.Content>
</Card.Root>

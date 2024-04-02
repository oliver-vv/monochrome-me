<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { Input } from '$lib/components/ui/input';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { loginSchema, type LoginSchema } from './schema';

	export let data: SuperValidated<Infer<LoginSchema>>;

	const form = superForm(data, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root class="w-full max-w-md mx-auto ">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance class="grid gap-2">
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} bind:value={$formData.email} placeholder="Your email" />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input {...attrs} bind:value={$formData.password} placeholder="Your password" />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Button>Login</Form.Button>
		</form>
	</Card.Content>
	<Card.Footer>
		<span class="text-sm text-gray-500">
			Not a member?
			<Button variant="link" href="/auth/register">Register here</Button>
		</span>
	</Card.Footer>
</Card.Root>

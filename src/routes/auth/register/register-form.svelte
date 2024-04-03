<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { Input } from '$lib/components/ui/input';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { registerSchema, type RegisterSchema } from './schema';

	export let data: SuperValidated<Infer<RegisterSchema>>;

	const form = superForm(data, {
		validators: zodClient(registerSchema)
	});

	const { form: formData, enhance } = form;
</script>

<!-- <Card.Root class="w-full max-w-md mx-auto ">
	<Card.Header>
		<Card.Title class="text-2xl">Register</Card.Title>
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

			<Form.Field {form} name="confirmPassword">
				<Form.Control let:attrs>
					<Form.Label>Confirm Password</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.confirmPassword}
						placeholder="Confirm your password"
					/>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Button>Register</Form.Button>
		</form>
	</Card.Content>
	<Card.Footer>
		<span class="text-sm text-gray-500">
			Already a member?
			<Button variant="link" href="login">Login here</Button>
		</span>
	</Card.Footer>
</Card.Root> -->

<!-- <script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script> -->

<!-- <Card.Root class="mx-auto max-w-sm"> -->
<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Sign Up</Card.Title>
		<Card.Description>Enter your information to create an account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid gap-4">
				<!-- <div class="grid grid-cols-2 gap-4">
					<div class="grid gap-2">
						<Label for="first-name">First name</Label>
						<Input id="first-name" placeholder="Max" required />
					</div>
					<div class="grid gap-2">
						<Label for="last-name">Last name</Label>
						<Input id="last-name" placeholder="Robinson" required />
					</div>
				</div> -->
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
							<Input {...attrs} bind:value={$formData.password} placeholder="Your password" />
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
								bind:value={$formData.confirmPassword}
								placeholder="Confirm your password"
							/>
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>

				<Form.Button class="w-full">Create an account</Form.Button>
				<Button variant="outline" class="w-full">Sign up with GitHub</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="##" class="underline"> Sign in </a>
			</div>
		</form>
	</Card.Content>
</Card.Root>

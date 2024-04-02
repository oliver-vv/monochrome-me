<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '$lib/components/ui/textarea';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<!-- <Textarea class="min-h-[100px]" id="message" placeholder="Enter your message" /> -->

<!-- <div class="flex items-center justify-center"> -->
<Card.Root class="mx-auto max-w-md px-4">
	<Card.Header>
		<Card.Title tag="h2" class="text-2xl">Contact Us</Card.Title>
		<Card.Description
			>Fill out the form below and we'll get back to you as soon as possible.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid gap-4">
				<div class="grid gap-4 grid-cols-2">
					<Form.Field {form} name="firstName">
						<Form.Control let:attrs>
							<Form.Label>First Name</Form.Label>
							<Input {...attrs} bind:value={$formData.firstName} placeholder="Your first name" />
						</Form.Control>
						<!-- <Form.Description>Your first name</Form.Description> -->
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="lastName">
						<Form.Control let:attrs>
							<Form.Label>Last Name</Form.Label>
							<Input {...attrs} bind:value={$formData.lastName} placeholder="Your last name" />
						</Form.Control>
						<!-- <Form.Description>Your last name.</Form.Description> -->
						<Form.FieldErrors />
					</Form.Field>
				</div>

				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input {...attrs} bind:value={$formData.email} placeholder="Your email" />
					</Form.Control>
					<!-- <Form.Description>This is your email adress.</Form.Description> -->
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="message">
					<Form.Control let:attrs>
						<Form.Label>Message</Form.Label>
						<Textarea
							{...attrs}
							bind:value={$formData.message}
							placeholder="Your message"
							class="min-h-[100px]"
						/>
					</Form.Control>
					<Form.Description>How can we help?</Form.Description>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Button>Submit</Form.Button>
			</div>
		</form>
	</Card.Content>
</Card.Root>

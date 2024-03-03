<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<!-- <Textarea class="min-h-[100px]" id="message" placeholder="Enter your message" /> -->

<div class="flex items-center justify-center">
	<Card.Root>
		<Card.Header>
			<Card.Title tag="h2" class="text-2xl">Contact Us</Card.Title>
			<Card.Description
				>Fill out the form below and we'll get back to you as soon as possible.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<div class="grid gap-4">
					<Form.Field {form} name="name">
						<Form.Control let:attrs>
							<Form.Label>Name</Form.Label>
							<Input {...attrs} bind:value={$formData.name} placeholder="Your name" />
						</Form.Control>
						<Form.Description>This is your public display name.</Form.Description>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input {...attrs} bind:value={$formData.email} placeholder="Your email" />
						</Form.Control>
						<Form.Description>This is your email adress.</Form.Description>
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
</div>

<!-- <div class="space-y-4">
	<div class="grid grid-cols-2 gap-4">
		<div class="space-y-2">
			<Label for="first-name">First name</Label>
			<Input id="first-name" placeholder="Enter your first name" />
		</div>
		<div class="space-y-2">
			<Label for="last-name">Last name</Label>
			<Input id="last-name" placeholder="Enter your last name" />
		</div>
	</div>
	<div class="space-y-2">
		<Label for="email">Email</Label>
		<Input id="email" placeholder="Enter your email" type="email" />
	</div>
	<div class="space-y-2">
		<Label>Pronoun</Label>
		<Select.Root>
			<Select.Trigger aria-label="Pronoun">
				<Select.Value placeholder="Select your pronoun" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Pronouns</Select.Label>
					<Select.Item value="he/him">He/Him</Select.Item>
					<Select.Item value="she/her">She/Her</Select.Item>
					<Select.Item value="they/them">They/Them</Select.Item>
					<Select.Item value="prefer not to say">Prefer not to say</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>
	<div class="space-y-2">
		<Label for="message">Message</Label>
		<Textarea class="min-h-[100px]" id="message" placeholder="Enter your message" />
	</div>
	<Button class="bg-gray-800 text-white" type="submit">Send message</Button>
</div> -->

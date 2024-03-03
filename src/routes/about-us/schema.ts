import { z } from 'zod';

export const formSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.max(50, { message: 'Name must be less than 50 characters' }),
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.max(50, { message: 'Email must be less than 50 characters' })
		.email('Please enter a valid email address'),
	message: z
		.string({ required_error: 'Message is required' })
		.min(10, { message: 'Message must be more than 10 characters' })
		.max(500, { message: 'Email must be less than 500 characters' })
});

export type FormSchema = typeof formSchema;

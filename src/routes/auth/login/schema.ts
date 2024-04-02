import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.max(50, { message: 'Email must be less than 50 characters' })
		.email('Please enter a valid email address'),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be more than 6 characters' })
		.max(50, { message: 'Password must be less than 50 characters' })
});

export type LoginSchema = typeof loginSchema;

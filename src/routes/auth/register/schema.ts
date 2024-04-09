import { z } from 'zod';

export const registerSchema = z
	.object({
		first_name: z
			.string({ required_error: 'Name is required' })
			.min(1, { message: 'Name is required' })
			.max(20, { message: 'Name must be less than 50 characters' }),
		last_name: z
			.string({ required_error: 'Name is required' })
			.min(1, { message: 'Name is required' })
			.max(20, { message: 'Name must be less than 50 characters' }),
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.max(50, { message: 'Email must be less than 50 characters' })
			.email('Please enter a valid email address'),
		password: z
			.string({ required_error: 'Password is required' })
			.min(6, { message: 'Password must be more than 6 characters' })
			.max(50, { message: 'Password must be less than 50 characters' }),
		confirm_password: z
			.string({ required_error: 'Confirm password is required' })
			.min(6, { message: 'Confirm Password must be more than 6 characters' })
			.max(50, { message: 'Confirm Password must be less than 50 characters' })
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords don't match",
		path: ['confirmPassword'] // Specifies which field the error message is associated with
	});

export type RegisterSchema = typeof registerSchema;

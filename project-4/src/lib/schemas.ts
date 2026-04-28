import { z } from 'zod';

export const createTaskSchema = z.object({
	title: z
		.string()
		.min(1, 'Title is required')
		.max(200, 'Title must be 200 characters or less')
		.transform((s) => s.trim())
});

export const updateTaskSchema = z.object({
	title: z
		.string()
		.min(1, 'Title is required')
		.max(200, 'Title must be 200 characters or less')
		.transform((s) => s.trim())
		.optional(),
	completed: z.boolean().optional()
});

export const filterSchema = z.enum(['all', 'todo', 'done']).default('all');

import { error, json } from '@sveltejs/kit';
import { db } from '$lib/db';
import { createTaskSchema, filterSchema } from '$lib/schemas';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const rawFilter = url.searchParams.get('filter') ?? 'all';
	const filterResult = filterSchema.safeParse(rawFilter);
	const filter = filterResult.success ? filterResult.data : 'all';

	const where =
		filter === 'todo' ? { completed: false } : filter === 'done' ? { completed: true } : {};

	const tasks = await db.task.findMany({
		where,
		orderBy: { createdAt: 'desc' }
	});

	return json(tasks);
};

export const POST: RequestHandler = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		throw error(400, 'Invalid JSON body');
	}

	const parsed = createTaskSchema.safeParse(body);
	if (!parsed.success) {
		throw error(400, parsed.error.issues.map((i) => i.message).join(', '));
	}

	const task = await db.task.create({ data: parsed.data });
	return json(task, { status: 201 });
};

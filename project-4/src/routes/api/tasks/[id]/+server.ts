import { error, json } from '@sveltejs/kit';
import { db } from '$lib/db';
import { updateTaskSchema } from '$lib/schemas';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ params, request }) => {
	const id = parseInt(params.id, 10);
	if (Number.isNaN(id)) {
		throw error(400, 'Invalid task ID');
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		throw error(400, 'Invalid JSON body');
	}

	const parsed = updateTaskSchema.safeParse(body);
	if (!parsed.success) {
		throw error(400, parsed.error.issues.map((i) => i.message).join(', '));
	}

	try {
		const task = await db.task.update({
			where: { id },
			data: parsed.data
		});
		return json(task);
	} catch (e: any) {
		if (e.code === 'P2025') {
			throw error(404, 'Task not found');
		}
		console.error('Database error on PATCH /api/tasks/:id', e);
		throw error(500, 'Internal server error');
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	const id = parseInt(params.id, 10);
	if (Number.isNaN(id)) {
		throw error(400, 'Invalid task ID');
	}

	try {
		await db.task.delete({ where: { id } });
		return new Response(null, { status: 204 });
	} catch (e: any) {
		if (e.code === 'P2025') {
			throw error(404, 'Task not found');
		}
		console.error('Database error on DELETE /api/tasks/:id', e);
		throw error(500, 'Internal server error');
	}
};

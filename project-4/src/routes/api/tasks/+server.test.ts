import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from './+server';
import { db } from '$lib/db';

vi.mock('$lib/db', () => ({
	db: {
		task: {
			findMany: vi.fn(),
			create: vi.fn()
		}
	}
}));

beforeEach(() => {
	vi.clearAllMocks();
});

describe('GET /api/tasks', () => {
	it('returns tasks ordered by createdAt desc', async () => {
		const tasks = [{ id: 1, title: 'T', completed: false, createdAt: new Date().toISOString() }];
		db.task.findMany.mockResolvedValue(tasks);
		const response = await GET({ url: new URL('http://localhost/api/tasks?filter=all') } as any);
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual(tasks);
		expect(db.task.findMany).toHaveBeenCalledWith({ where: {}, orderBy: { createdAt: 'desc' } });
	});

	it('filters todo tasks', async () => {
		db.task.findMany.mockResolvedValue([]);
		await GET({ url: new URL('http://localhost/api/tasks?filter=todo') } as any);
		expect(db.task.findMany).toHaveBeenCalledWith({
			where: { completed: false },
			orderBy: { createdAt: 'desc' }
		});
	});

	it('filters done tasks', async () => {
		db.task.findMany.mockResolvedValue([]);
		await GET({ url: new URL('http://localhost/api/tasks?filter=done') } as any);
		expect(db.task.findMany).toHaveBeenCalledWith({
			where: { completed: true },
			orderBy: { createdAt: 'desc' }
		});
	});
});

describe('POST /api/tasks', () => {
	it('creates a task with valid data', async () => {
		const created = { id: 1, title: 'New', completed: false, createdAt: new Date().toISOString() };
		db.task.create.mockResolvedValue(created);
		const request = new Request('http://localhost/api/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: 'New' })
		});
		const response = await POST({ request, url: new URL('http://localhost/api/tasks') } as any);
		expect(response.status).toBe(201);
		expect(await response.json()).toEqual(created);
	});

	it('returns 400 for an empty title', async () => {
		const request = new Request('http://localhost/api/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: '' })
		});
		await expect(POST({ request, url: new URL('http://localhost/api/tasks') } as any)).rejects.toMatchObject({ status: 400 });
	});

	it('returns 400 for a missing body', async () => {
		const request = new Request('http://localhost/api/tasks', { method: 'POST' });
		await expect(POST({ request, url: new URL('http://localhost/api/tasks') } as any)).rejects.toMatchObject({ status: 400 });
	});
});

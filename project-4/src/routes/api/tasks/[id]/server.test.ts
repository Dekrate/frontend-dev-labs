import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DELETE, PATCH } from './+server';
import { db } from '$lib/db';

vi.mock('$lib/db', () => ({
	db: {
		task: {
			update: vi.fn(),
			delete: vi.fn()
		}
	}
}));

beforeEach(() => {
	vi.clearAllMocks();
});

describe('PATCH /api/tasks/:id', () => {
	it('updates task completion', async () => {
		const updated = { id: 1, title: 'T', completed: true, createdAt: new Date() };
		vi.mocked(db.task.update).mockResolvedValue(updated);
		const request = new Request('http://localhost/api/tasks/1', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ completed: true })
		});
		const response = await PATCH({
			params: { id: '1' },
			request,
			url: new URL('http://localhost/api/tasks/1')
		} as any);
		expect(response.status).toBe(200);
		const body = await response.json();
		expect(body).toMatchObject({ id: 1, title: 'T', completed: true });
	});

	it('returns 400 for an invalid id', async () => {
		const request = new Request('http://localhost/api/tasks/abc', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ completed: true })
		});
		await expect(
			PATCH({
				params: { id: 'abc' },
				request,
				url: new URL('http://localhost/api/tasks/abc')
			} as any)
		).rejects.toMatchObject({ status: 400 });
	});

	it('returns 404 for a missing task', async () => {
		vi.mocked(db.task.update).mockRejectedValue({ code: 'P2025' });
		const request = new Request('http://localhost/api/tasks/999', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ completed: true })
		});
		await expect(
			PATCH({
				params: { id: '999' },
				request,
				url: new URL('http://localhost/api/tasks/999')
			} as any)
		).rejects.toMatchObject({ status: 404 });
	});
});

describe('DELETE /api/tasks/:id', () => {
	it('deletes a task', async () => {
		vi.mocked(db.task.delete).mockResolvedValue({ id: 1, title: 'T', completed: false, createdAt: new Date() } as any);
		const response = await DELETE({
			params: { id: '1' },
			url: new URL('http://localhost/api/tasks/1')
		} as any);
		expect(response.status).toBe(204);
	});

	it('returns 400 for an invalid id', async () => {
		await expect(
			DELETE({
				params: { id: 'abc' },
				url: new URL('http://localhost/api/tasks/abc')
			} as any)
		).rejects.toMatchObject({ status: 400 });
	});

	it('returns 404 for a missing task', async () => {
		vi.mocked(db.task.delete).mockRejectedValue({ code: 'P2025' });
		await expect(
			DELETE({
				params: { id: '999' },
				url: new URL('http://localhost/api/tasks/999')
			} as any)
		).rejects.toMatchObject({ status: 404 });
	});
});

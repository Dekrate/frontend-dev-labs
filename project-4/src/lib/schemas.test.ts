import { describe, it, expect } from 'vitest';
import { createTaskSchema, filterSchema, updateTaskSchema } from './schemas';

describe('createTaskSchema', () => {
	it('accepts a valid title', () => {
		expect(createTaskSchema.parse({ title: 'Buy milk' })).toEqual({ title: 'Buy milk' });
	});

	it('trims whitespace', () => {
		expect(createTaskSchema.parse({ title: '  Buy milk  ' })).toEqual({ title: 'Buy milk' });
	});

	it('rejects an empty title', () => {
		expect(() => createTaskSchema.parse({ title: '' })).toThrow();
	});

	it('rejects a title over 200 characters', () => {
		expect(() => createTaskSchema.parse({ title: 'a'.repeat(201) })).toThrow();
	});

	it('rejects a missing title', () => {
		expect(() => createTaskSchema.parse({})).toThrow();
	});
});

describe('updateTaskSchema', () => {
	it('accepts a completed boolean', () => {
		expect(updateTaskSchema.parse({ completed: true })).toEqual({ completed: true });
	});

	it('accepts a title update', () => {
		expect(updateTaskSchema.parse({ title: 'Updated' })).toEqual({ title: 'Updated' });
	});

	it('accepts an empty object', () => {
		expect(updateTaskSchema.parse({})).toEqual({});
	});

	it('rejects an invalid title', () => {
		expect(() => updateTaskSchema.parse({ title: '' })).toThrow();
	});
});

describe('filterSchema', () => {
	it('defaults to all', () => {
		expect(filterSchema.parse(undefined)).toBe('all');
	});

	it('accepts valid filters', () => {
		expect(filterSchema.parse('todo')).toBe('todo');
		expect(filterSchema.parse('done')).toBe('done');
	});

	it('rejects an invalid filter', () => {
		expect(() => filterSchema.parse('invalid')).toThrow();
	});
});

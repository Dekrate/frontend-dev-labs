import { describe, it, expect, beforeEach, vi } from 'vitest';
import { validateTodo } from './utils.js';

describe('validateTodo', () => {
  it('accepts valid text', () => {
    const result = validateTodo('Buy milk');
    expect(result.valid).toBe(true);
    expect(result.text).toBe('Buy milk');
  });

  it('trims whitespace', () => {
    const result = validateTodo('  Buy milk  ');
    expect(result.valid).toBe(true);
    expect(result.text).toBe('Buy milk');
  });

  it('rejects empty string', () => {
    const result = validateTodo('');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Task cannot be empty');
  });

  it('rejects whitespace-only string', () => {
    const result = validateTodo('   ');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Task cannot be empty');
  });

  it('rejects non-string input', () => {
    const result = validateTodo(null);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Input must be text');
  });

  it('rejects text over 200 characters', () => {
    const longText = 'a'.repeat(201);
    const result = validateTodo(longText);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Task is too long (max 200 characters)');
  });

  it('accepts text exactly 200 characters', () => {
    const text = 'a'.repeat(200);
    const result = validateTodo(text);
    expect(result.valid).toBe(true);
    expect(result.text).toBe(text);
  });
});

export function validateTodo(text) {
  if (typeof text !== 'string') {
    return { valid: false, error: 'Input must be text' };
  }

  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Task cannot be empty' };
  }

  if (trimmed.length > 200) {
    return { valid: false, error: 'Task is too long (max 200 characters)' };
  }

  return { valid: true, text: trimmed };
}

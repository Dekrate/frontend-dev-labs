import sqlite3 from 'sqlite3';
import path from 'path';

const DB_PATH = path.resolve(__dirname, '../data/tasks.db');

export const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite database:', err.message);
    process.exit(1);
  }
  console.log('Connected to SQLite database.');
});

export function initSchema(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL CHECK(length(title) > 0 AND length(title) <= 255),
        completed INTEGER DEFAULT 0 CHECK(completed IN (0, 1)),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

interface DbTask {
  id: number;
  title: string;
  completed: number;
  created_at: string;
}

function toTask(row: DbTask): Task {
  return {
    id: row.id,
    title: row.title,
    completed: !!row.completed,
    created_at: row.created_at,
  };
}

export function getAllTasks(): Promise<Task[]> {
  return new Promise((resolve, reject) => {
    db.all<DbTask>(
      'SELECT id, title, completed, created_at FROM tasks ORDER BY created_at DESC',
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(toTask));
      }
    );
  });
}

export function createTask(title: string): Promise<Task> {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO tasks (title) VALUES (?)',
      [title],
      function (err) {
        if (err) return reject(err);
        const id = this.lastID;
        db.get<DbTask>(
          'SELECT id, title, completed, created_at FROM tasks WHERE id = ?',
          [id],
          (err2, row) => {
            if (err2 || !row) return reject(err2 ?? new Error('Insert failed'));
            resolve(toTask(row));
          }
        );
      }
    );
  });
}

export function updateTask(
  id: number,
  fields: { title?: string; completed?: boolean }
): Promise<Task> {
  return new Promise((resolve, reject) => {
    const sets: string[] = [];
    const values: (string | number)[] = [];

    if (fields.title !== undefined) {
      sets.push('title = ?');
      values.push(fields.title);
    }
    if (fields.completed !== undefined) {
      sets.push('completed = ?');
      values.push(fields.completed ? 1 : 0);
    }

    if (sets.length === 0) {
      return reject(new Error('No fields to update'));
    }

    values.push(id);

    db.run(
      `UPDATE tasks SET ${sets.join(', ')} WHERE id = ?`,
      values,
      function (err) {
        if (err) return reject(err);
        if (this.changes === 0) return reject(new Error('Task not found'));

        db.get<DbTask>(
          'SELECT id, title, completed, created_at FROM tasks WHERE id = ?',
          [id],
          (err2, row) => {
            if (err2 || !row) return reject(err2 ?? new Error('Update failed'));
            resolve(toTask(row));
          }
        );
      }
    );
  });
}

export function deleteTask(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
      if (err) return reject(err);
      if (this.changes === 0) return reject(new Error('Task not found'));
      resolve();
    });
  });
}

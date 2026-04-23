import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { initSchema, getAllTasks, createTask, updateTask, deleteTask } from './db';

export const app = express();

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());

app.get('/api/tasks', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

app.post('/api/tasks', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    if (typeof title !== 'string' || title.trim().length === 0 || title.trim().length > 255) {
      res.status(400).json({ error: 'Title must be between 1 and 255 characters.' });
      return;
    }
    const task = await createTask(title.trim());
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

app.patch('/api/tasks/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: 'Invalid task id.' });
      return;
    }
    const { title, completed } = req.body;
    const fields: { title?: string; completed?: boolean } = {};

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0 || title.trim().length > 255) {
        res.status(400).json({ error: 'Title must be between 1 and 255 characters.' });
        return;
      }
      fields.title = title.trim();
    }
    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        res.status(400).json({ error: 'Completed must be a boolean.' });
        return;
      }
      fields.completed = completed;
    }

    const task = await updateTask(id, fields);
    res.json(task);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/tasks/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: 'Invalid task id.' });
      return;
    }
    await deleteTask(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

export async function initApp(): Promise<void> {
  await initSchema();
}

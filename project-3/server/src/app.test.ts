import { describe, it, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import request from 'supertest';
import { app, initApp } from './app';
import { db } from './db';

describe('Tasks API', () => {
  beforeAll(async () => {
    await initApp();
  });

  beforeEach((done) => {
    db.run('DELETE FROM tasks', () => done());
  });

  afterAll((done) => {
    db.run('DELETE FROM tasks', () => {
      db.close(() => done());
    });
  });

  it('GET /api/tasks returns empty array initially', async () => {
    const res = await request(app).get('/api/tasks').expect(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/tasks creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Learn React' })
      .expect(201);
    expect(res.body.title).toBe('Learn React');
    expect(res.body.completed).toBe(false);
    expect(typeof res.body.id).toBe('number');
  });

  it('POST /api/tasks rejects empty title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '   ' })
      .expect(400);
    expect(res.body.error).toContain('Title must be between 1 and 255 characters');
  });

  it('POST /api/tasks rejects title longer than 255 characters', async () => {
    const longTitle = 'a'.repeat(256);
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: longTitle })
      .expect(400);
    expect(res.body.error).toContain('Title must be between 1 and 255 characters');
  });

  it('PATCH /api/tasks/:id toggles completion', async () => {
    const createRes = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test toggle' })
      .expect(201);
    const id = createRes.body.id;

    const patchRes = await request(app)
      .patch(`/api/tasks/${id}`)
      .send({ completed: true })
      .expect(200);
    expect(patchRes.body.completed).toBe(true);
  });

  it('PATCH /api/tasks/:id updates title', async () => {
    const createRes = await request(app)
      .post('/api/tasks')
      .send({ title: 'Old title' })
      .expect(201);
    const id = createRes.body.id;

    const patchRes = await request(app)
      .patch(`/api/tasks/${id}`)
      .send({ title: 'New title' })
      .expect(200);
    expect(patchRes.body.title).toBe('New title');
  });

  it('PATCH /api/tasks/:id rejects invalid id', async () => {
    const res = await request(app)
      .patch('/api/tasks/abc')
      .send({ completed: true })
      .expect(400);
    expect(res.body.error).toContain('Invalid task id');
  });

  it('DELETE /api/tasks/:id removes a task', async () => {
    const createRes = await request(app)
      .post('/api/tasks')
      .send({ title: 'To be deleted' })
      .expect(201);
    const id = createRes.body.id;

    await request(app).delete(`/api/tasks/${id}`).expect(204);
    const listRes = await request(app).get('/api/tasks').expect(200);
    expect(listRes.body).toEqual([]);
  });

  it('DELETE /api/tasks/:id returns 500 for unknown id', async () => {
    const res = await request(app).delete('/api/tasks/99999').expect(500);
    expect(res.body.error).toBe('Internal server error.');
  });
});

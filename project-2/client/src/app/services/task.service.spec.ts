import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load tasks', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'T1', completed: false, created_at: '2026-01-01' },
    ];
    service.loadTasks();
    const req = httpMock.expectOne('http://localhost:3000/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
    expect(service.tasks()).toEqual(mockTasks);
    expect(service.loading()).toBe(false);
  });

  it('should handle load error', () => {
    service.loadTasks();
    const req = httpMock.expectOne('http://localhost:3000/api/tasks');
    req.error(new ProgressEvent('error'), { status: 0 });
    expect(service.error()).toContain('Cannot reach');
    expect(service.loading()).toBe(false);
  });

  it('should add a task', () => {
    const newTask: Task = {
      id: 2,
      title: 'New',
      completed: false,
      created_at: '2026-01-02',
    };
    service.addTask('New');
    const req = httpMock.expectOne('http://localhost:3000/api/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
    expect(service.tasks()).toContainEqual(newTask);
  });

  it('should toggle a task', () => {
    const task: Task = {
      id: 1,
      title: 'T',
      completed: false,
      created_at: '2026-01-01',
    };
    service.tasks.set([task]);
    const updated: Task = { ...task, completed: true };
    service.toggleTask(task);
    const req = httpMock.expectOne('http://localhost:3000/api/tasks/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(updated);
    expect(service.tasks()[0].completed).toBe(true);
  });

  it('should delete a task', () => {
    const task: Task = {
      id: 1,
      title: 'T',
      completed: false,
      created_at: '2026-01-01',
    };
    service.tasks.set([task]);
    service.deleteTask(1);
    const req = httpMock.expectOne('http://localhost:3000/api/tasks/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
    expect(service.tasks()).toEqual([]);
  });
});

import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Task } from '../models/task.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiUrl = 'http://localhost:3000/api/tasks';

  readonly tasks = signal<Task[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  private handleError(err: HttpErrorResponse): Observable<never> {
    let message = 'Unknown error occurred.';
    if (err.error instanceof ErrorEvent) {
      message = `Client error: ${err.error.message}`;
    } else if (err.status === 0) {
      message = 'Cannot reach the server. Is it running?';
    } else {
      message = err.error?.error ?? `Server error ${err.status}`;
    }
    this.error.set(message);
    this.loading.set(false);
    return throwError(() => new Error(message));
  }

  loadTasks(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http
      .get<Task[]>(this.apiUrl)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe({
        next: (data) => {
          this.tasks.set(data);
          this.loading.set(false);
        },
        error: () => {},
      });
  }

  addTask(title: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.http
      .post<Task>(this.apiUrl, { title })
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe({
        next: (task) => {
          this.tasks.update((list) => [task, ...list]);
          this.loading.set(false);
        },
        error: () => {},
      });
  }

  toggleTask(task: Task): void {
    const newStatus = !task.completed;
    this.http
      .patch<Task>(`${this.apiUrl}/${task.id}`, { completed: newStatus })
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe({
        next: (updated) => {
          this.tasks.update((list) =>
            list.map((t) => (t.id === updated.id ? updated : t))
          );
        },
        error: () => {},
      });
  }

  deleteTask(id: number): void {
    this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe({
        next: () => {
          this.tasks.update((list) => list.filter((t) => t.id !== id));
        },
        error: () => {},
      });
  }
}

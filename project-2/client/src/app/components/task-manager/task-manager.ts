import { Component, computed, OnInit, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskForm } from '../task-form/task-form';
import { TaskList } from '../task-list/task-list';

type Filter = 'all' | 'todo' | 'done';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [TaskForm, TaskList],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.scss',
})
export class TaskManager implements OnInit {
  readonly filter = signal<Filter>('all');

  readonly filteredTasks = computed<Task[]>(() => {
    const all = this.taskService.tasks();
    const f = this.filter();
    if (f === 'todo') return all.filter((t) => !t.completed);
    if (f === 'done') return all.filter((t) => t.completed);
    return all;
  });

  readonly counts = computed(() => {
    const all = this.taskService.tasks();
    return {
      all: all.length,
      todo: all.filter((t) => !t.completed).length,
      done: all.filter((t) => t.completed).length,
    };
  });

  get loading() {
    return this.taskService.loading;
  }

  get error() {
    return this.taskService.error;
  }

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  setFilter(f: Filter): void {
    this.filter.set(f);
  }

  onAdd(title: string): void {
    this.taskService.addTask(title);
  }

  onToggle(id: number): void {
    const task = this.taskService.tasks().find((t) => t.id === id);
    if (task) this.taskService.toggleTask(task);
  }

  onDelete(id: number): void {
    this.taskService.deleteTask(id);
  }

  dismissError(): void {
    this.error.set(null);
  }
}

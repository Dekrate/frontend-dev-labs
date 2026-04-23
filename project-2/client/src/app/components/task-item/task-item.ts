import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {
  readonly task = input.required<Task>();
  readonly toggle = output<number>();
  readonly remove = output<number>();

  onToggle(): void {
    this.toggle.emit(this.task().id);
  }

  onDelete(): void {
    this.remove.emit(this.task().id);
  }
}

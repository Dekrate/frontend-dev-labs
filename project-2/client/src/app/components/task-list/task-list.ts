import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  readonly tasks = input.required<Task[]>();
  readonly toggle = output<number>();
  readonly remove = output<number>();
}

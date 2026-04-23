import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  readonly add = output<string>();
  title = '';

  submit(): void {
    const trimmed = this.title.trim();
    if (!trimmed) return;
    this.add.emit(trimmed);
    this.title = '';
  }
}

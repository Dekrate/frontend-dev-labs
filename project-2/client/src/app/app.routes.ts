import { Routes } from '@angular/router';
import { TaskManager } from './components/task-manager/task-manager';

export const routes: Routes = [
  { path: '', component: TaskManager },
  { path: '**', redirectTo: '' },
];

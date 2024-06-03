import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { TrashComponent } from './pages/trash/trash.component';
import { TaskComponent } from './pages/task/task.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'trash',
    component: TrashComponent,
  },

  {
    path: 'task/:id',
    component: TaskComponent,
  },
];

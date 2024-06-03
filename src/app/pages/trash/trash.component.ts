import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TasksProps } from '../../types/tasks-props';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
})
export class TrashComponent implements OnInit {
  deletedTasks: TasksProps[] = [];
  response = localStorage.getItem('deletedTasks');

  constructor(public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.deletedTasks = this.response ? JSON.parse(this.response) : [];
  }

  restoreTask(id: string) {
    const newDeletedTasks = this.deletedTasks.find((task) => task.id === id);

    if (!newDeletedTasks) return;

    const response = localStorage.getItem('tasks');

    let tasks = response ? JSON.parse(response) : [];

    tasks = [...tasks, newDeletedTasks];

    localStorage.setItem('tasks', JSON.stringify(tasks));

    this.deletedTasks = this.deletedTasks.filter((task) => task.id !== id);

    localStorage.setItem('deletedTasks', JSON.stringify(this.deletedTasks));

    this.snackBar.open('Tarefa restaurada com sucesso.', 'Fechar', {
      duration: 1500,
    });
  }

  deleteTasks(id: string) {
    this.deletedTasks = this.deletedTasks.filter((task) => task.id !== id);

    localStorage.setItem('deletedTasks', JSON.stringify(this.deletedTasks));

    this.snackBar.open(
      'Tarefa excluida permanentemente com sucesso.',
      'Fechar',
      {
        duration: 1500,
      },
    );
  }
}

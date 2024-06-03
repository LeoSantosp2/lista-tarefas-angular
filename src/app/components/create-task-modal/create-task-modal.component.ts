import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { v4 } from 'uuid';

import { TasksProps } from '../../types/tasks-props';

@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  imports: [],
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.css',
})
export class CreateTaskModalComponent {
  tasks: TasksProps[] = [];
  id: string = v4();
  title: string = '';
  description: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateTaskModalComponent>,
    public router: Router,
    public snackBar: MatSnackBar,
  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  handleChangeInput(value: Event) {
    const { target } = value;

    this.title = (target as HTMLInputElement).value;
  }

  handleChangeTextarea(value: Event) {
    const { target } = value;

    this.description = (target as HTMLTextAreaElement).value;
  }

  createTask() {
    const response = localStorage.getItem('tasks');

    let tasks = response ? JSON.parse(response) : [];

    const newTasks = [...tasks];

    const newTask = {
      id: this.id,
      title: this.title,
      description: this.description,
      task: '',
    };

    tasks = [...newTasks, newTask];

    localStorage.setItem('tasks', JSON.stringify(tasks));

    this.router.navigate([`task/${this.id}`]);
    this.dialogRef.close();

    this.snackBar.open('Tarefa criada com sucesso.', 'Fechar', {
      duration: 1500,
    });
  }
}

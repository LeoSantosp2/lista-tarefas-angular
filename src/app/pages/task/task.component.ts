import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TasksProps } from '../../types/tasks-props';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  response = localStorage.getItem('tasks');
  currentTask: string = '';
  task: TasksProps = {
    id: '',
    title: '',
    description: '',
    task: '',
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const tasks: TasksProps[] = this.response ? JSON.parse(this.response) : [];

    const newTask = tasks.find(
      (task) => task.id === this.activatedRoute.snapshot.params['id'],
    );

    if (!newTask) return;

    this.task = newTask;
  }

  handleChange(value: Event) {
    const { target } = value;

    this.currentTask = (target as HTMLTextAreaElement).value;
  }

  moveTaskToTrash(id: string) {
    const tasks: TasksProps[] = this.response ? JSON.parse(this.response) : [];

    const deletedTask = tasks.filter((task) => task.id === id);

    const res = localStorage.getItem('deletedTasks');

    let newRes: TasksProps[] = res ? JSON.parse(res) : [];

    newRes = [...newRes, deletedTask[0]];

    localStorage.setItem('deletedTasks', JSON.stringify(newRes));
  }

  saveTask() {
    this.task.task = this.currentTask;

    const tasks: TasksProps[] = this.response ? JSON.parse(this.response) : [];

    let newTasks: TasksProps[] = tasks.filter(
      (task) => task.id !== this.activatedRoute.snapshot.params['id'],
    );

    newTasks = [...newTasks, this.task];

    localStorage.setItem('tasks', JSON.stringify(newTasks));

    this.snackBar.open('Tarefa salva com sucesso.', 'Fechar', {
      duration: 1500,
    });
  }

  deleteTask(id: string) {
    const tasks: TasksProps[] = this.response ? JSON.parse(this.response) : [];

    const newTasks = tasks.filter((task) => task.id !== id);

    this.moveTaskToTrash(id);

    localStorage.setItem('tasks', JSON.stringify(newTasks));

    this.router.navigate(['']);

    this.snackBar.open('Tarefa excluida com sucesso.', 'Fechar', {
      duration: 1500,
    });
  }
}

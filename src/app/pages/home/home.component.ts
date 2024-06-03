import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TasksProps } from '../../types/tasks-props';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  tasks: TasksProps[] = [];

  constructor(public router: Router) {}

  ngOnInit(): void {
    const response = localStorage.getItem('tasks');

    this.tasks = response ? JSON.parse(response) : [];
  }

  navigate(id: string) {
    this.router.navigate([`task/${id}`]);
  }
}

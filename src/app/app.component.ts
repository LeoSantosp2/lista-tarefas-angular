import { Component, OnInit, DoCheck } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, DoCheck {
  listTasks: string[] = [];
  inputValue: string = '';
  index: number = -1;

  ngOnInit(): void {
    const response = localStorage.getItem('listTasks');

    this.listTasks = response ? JSON.parse(response) : [];
  }

  ngDoCheck(): void {
    localStorage.setItem('listTasks', JSON.stringify(this.listTasks));
  }

  handleChange(value: Event) {
    const { target } = value;
    this.inputValue = (target as HTMLInputElement).value;
  }

  handleAddTask() {
    if (this.listTasks.indexOf(this.inputValue) !== -1) return;

    const newlistTasks = [...this.listTasks];

    if (this.index === -1) {
      this.listTasks = [...newlistTasks, this.inputValue];

      this.inputValue = '';
    } else {
      newlistTasks[this.index] = this.inputValue;

      this.listTasks = newlistTasks;

      this.index = -1;

      this.inputValue = '';
    }
  }

  handleEditTask(id: number) {
    this.inputValue = this.listTasks[id];
    this.index = id;
  }

  handleDeleteTask(id: number) {
    this.listTasks.splice(id, 1);
  }
}

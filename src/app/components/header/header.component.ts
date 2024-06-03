import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) {}

  openModal() {
    this.dialog.open(CreateTaskModalComponent, {
      width: '50%',
    });
  }
}
